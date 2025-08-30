// components/public/detailArticle/TableOfContentsGenerator.tsx
'use client';

import React from 'react';

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  type: 'heading' | 'fallback' | 'auto-generated';
  element?: HTMLElement;
}

export interface TocGenerationResult {
  items: TableOfContentsItem[];
  method: 'none' | 'headings' | 'fallback' | 'auto';
  confidence: number; // 0-100, how confident we are about the ToC quality
}

export class TableOfContentsGenerator {
  private static readonly MIN_HEADING_LENGTH = 3;
  private static readonly MAX_HEADING_LENGTH = 80;
  private static readonly MIN_CONTENT_LENGTH = 100;
  private static readonly MAX_TOC_ITEMS = 10;

  static cleanText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&[^;]+;/g, ' ') // Remove HTML entities
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  static generateFromHeadings(content: string): TocGenerationResult {
    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      // Fix: Create items array directly without null values
      const items: TableOfContentsItem[] = [];
      
      Array.from(headings).forEach((heading, index) => {
        const text = this.cleanText(heading.textContent || '');
        
        if (text.length >= this.MIN_HEADING_LENGTH && text.length <= this.MAX_HEADING_LENGTH) {
          items.push({
            id: `heading-${index}`,
            title: text,
            level: parseInt(heading.tagName.charAt(1)),
            type: 'heading'
          });
        }
      });

      // Limit to maximum items
      const finalItems = items.slice(0, this.MAX_TOC_ITEMS);

      // Calculate confidence based on heading distribution and quality
      let confidence = 0;
      if (finalItems.length >= 2) {
        confidence = Math.min(90, 30 + (finalItems.length * 10));
        
        // Bonus for good level distribution
        const levels = [...new Set(finalItems.map(item => item.level))];
        if (levels.length >= 2) confidence += 10;
        
        // Bonus for reasonable title lengths
        const avgTitleLength = finalItems.reduce((sum, item) => sum + item.title.length, 0) / finalItems.length;
        if (avgTitleLength >= 10 && avgTitleLength <= 40) confidence += 10;
      }

      return {
        items: finalItems,
        method: finalItems.length >= 2 ? 'headings' : 'none',
        confidence
      };
    } catch (error) {
      console.error('Error generating heading ToC:', error);
      return { items: [], method: 'none', confidence: 0 };
    }
  }

  static generateFallback(content: string): TocGenerationResult {
    const items: TableOfContentsItem[] = [];
    let itemIndex = 0;
    let confidence = 0;

    try {
      // Pattern 1: Numbered sections (1. Title, 2. Title, etc.)
      const numberedPattern = /(?:^|<p[^>]*>|\n)\s*(\d+)\.\s*([^<\n]{8,60})(?=\s|<|$)/gi;
      let match;
      const numberedItems: TableOfContentsItem[] = [];
      
      while ((match = numberedPattern.exec(content)) !== null && numberedItems.length < 6) {
        const title = this.cleanText(match[2]);
        if (title.length >= 5 && !this.isLikelyNotHeading(title)) {
          numberedItems.push({
            id: `numbered-${itemIndex++}`,
            title: title.length > 50 ? `${title.substring(0, 50)}...` : title,
            level: 2,
            type: 'fallback'
          });
        }
      }
      
      if (numberedItems.length >= 2) {
        items.push(...numberedItems);
        confidence += numberedItems.length * 15;
      }

      // Pattern 2: Strong/Bold text that could be headings
      const boldPattern = /<(?:strong|b)(?:[^>]*)>([^<]{8,50})<\/(?:strong|b)>/gi;
      const boldItems: TableOfContentsItem[] = [];
      
      while ((match = boldPattern.exec(content)) !== null && boldItems.length < 5) {
        const title = this.cleanText(match[1]);
        if (title.length >= 6 && this.looksLikeHeading(title)) {
          boldItems.push({
            id: `bold-${itemIndex++}`,
            title: title.length > 45 ? `${title.substring(0, 45)}...` : title,
            level: 3,
            type: 'fallback'
          });
        }
      }
      
      if (boldItems.length >= 1 && items.length < 4) {
        items.push(...boldItems.slice(0, 4 - items.length));
        confidence += boldItems.length * 10;
      }

      // Pattern 3: Medical/Health keyword patterns
      const medicalKeywords = [
        'pengertian', 'definisi', 'penyebab', 'gejala', 'cara', 'tips', 
        'manfaat', 'dampak', 'pencegahan', 'pengobatan', 'kesimpulan',
        'diagnosis', 'terapi', 'obat', 'vitamin', 'nutrisi', 'diet'
      ];
      
      // Fix: Properly escape the regex pattern
      const keywordPattern = new RegExp(
        `<p[^>]*>\\s*(?:<[^>]+>)*\\s*((?:${medicalKeywords.join('|')})[^<]{5,50})`,
        'gi'
      );
      
      const keywordItems: TableOfContentsItem[] = [];
      while ((match = keywordPattern.exec(content)) !== null && keywordItems.length < 4) {
        const title = this.cleanText(match[1]);
        if (title.length >= 8) {
          keywordItems.push({
            id: `keyword-${itemIndex++}`,
            title: title.length > 40 ? `${title.substring(0, 40)}...` : title,
            level: 2,
            type: 'fallback'
          });
        }
      }
      
      if (keywordItems.length >= 1 && items.length < 6) {
        items.push(...keywordItems.slice(0, 6 - items.length));
        confidence += keywordItems.length * 12;
      }

      // Pattern 4: List items that look like sections
      const listPattern = /<li[^>]*>([^<]{12,60})<\/li>/gi;
      const listItems: TableOfContentsItem[] = [];
      
      while ((match = listPattern.exec(content)) !== null && listItems.length < 3) {
        const title = this.cleanText(match[1]);
        if (title.length >= 10 && this.looksLikeHeading(title)) {
          listItems.push({
            id: `list-${itemIndex++}`,
            title: title.length > 45 ? `${title.substring(0, 45)}...` : title,
            level: 4,
            type: 'fallback'
          });
        }
      }
      
      if (listItems.length >= 1 && items.length < 8) {
        items.push(...listItems.slice(0, 8 - items.length));
        confidence += listItems.length * 8;
      }

      // Remove duplicates and sort by appearance order
      const uniqueItems = this.removeDuplicates(items).slice(0, this.MAX_TOC_ITEMS);
      
      // Adjust confidence based on final results
      if (uniqueItems.length >= 3) confidence += 10;
      if (uniqueItems.length >= 5) confidence += 10;
      
      return {
        items: uniqueItems,
        method: uniqueItems.length >= 2 ? 'fallback' : 'none',
        confidence: Math.min(75, confidence) // Cap fallback confidence at 75
      };
      
    } catch (error) {
      console.error('Error generating fallback ToC:', error);
      return { items: [], method: 'none', confidence: 0 };
    }
  }

  static generateAuto(content: string): TocGenerationResult {
    try {
      // Remove HTML tags and normalize text
      const textContent = content
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<style[^>]*>.*?<\/style>/gi, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (textContent.length < 500) {
        return { items: [], method: 'none', confidence: 0 };
      }

      // Split content into meaningful sections
      const sections = this.splitIntoSections(textContent);
      
      if (sections.length < 2) {
        return { items: [], method: 'none', confidence: 0 };
      }

      const items: TableOfContentsItem[] = sections.slice(0, 6).map((section, index) => {
        const title = this.extractSectionTitle(section);
        return {
          id: `auto-${index}`,
          title: title.length > 50 ? `${title.substring(0, 50)}...` : title,
          level: 2,
          type: 'auto-generated'
        };
      });

      const confidence = Math.min(50, 20 + (items.length * 5)); // Auto-generated has lower confidence
      
      return {
        items,
        method: items.length >= 2 ? 'auto' : 'none',
        confidence
      };
      
    } catch (error) {
      console.error('Error generating auto ToC:', error);
      return { items: [], method: 'none', confidence: 0 };
    }
  }

  private static splitIntoSections(text: string): string[] {
    // Try multiple splitting strategies
    
    // Strategy 1: Split by double line breaks
    let sections = text.split(/\n\s*\n/).filter(s => s.trim().length > 80);
    
    if (sections.length < 2) {
      // Strategy 2: Split by sentences with significant gaps
      sections = text.split(/\.\s{3,}/).filter(s => s.trim().length > 100);
    }
    
    if (sections.length < 2) {
      // Strategy 3: Split by paragraph-like patterns
      sections = text.split(/(?:[.!?])\s+(?=[A-Z][a-z]{3,})/).filter(s => s.trim().length > 120);
    }
    
    if (sections.length < 2) {
      // Strategy 4: Split by length (as last resort)
      const avgSectionLength = Math.max(200, text.length / 5);
      sections = [];
      for (let i = 0; i < text.length; i += avgSectionLength) {
        const section = text.substring(i, i + avgSectionLength);
        if (section.length > 100) {
          sections.push(section);
        }
      }
    }
    
    return sections.filter(s => s.length >= 80 && s.length <= 500);
  }

  private static extractSectionTitle(section: string): string {
    const sentences = section.split(/[.!?]+/).filter(s => s.trim().length > 5);
    
    if (sentences.length === 0) {
      return section.substring(0, 40).trim();
    }
    
    // Use the first meaningful sentence
    let title = sentences[0].trim();
    
    // If first sentence is too long, try to find a shorter one
    if (title.length > 60 && sentences.length > 1) {
      for (let i = 1; i < Math.min(3, sentences.length); i++) {
        if (sentences[i].length >= 10 && sentences[i].length <= 50) {
          title = sentences[i].trim();
          break;
        }
      }
    }
    
    // Clean up title
    title = title.replace(/^(dan|atau|yang|untuk|dengan|dalam|pada|di|ke|dari)\s+/i, '');
    
    return title.length > 60 ? title.substring(0, 60).trim() : title;
  }

  private static looksLikeHeading(text: string): boolean {
    // Check if text looks like a heading rather than regular content
    const indicators = [
      text.length >= 8 && text.length <= 60, // Reasonable length
      /^[A-Z]/.test(text), // Starts with capital
      !/\s(dan|atau|yang|untuk|dengan|dalam|pada|di|ke|dari|adalah|akan|dapat|bisa|juga|tidak|atau|serta)\s/i.test(text), // Avoid connector words
      !text.includes('...'), // Not truncated text
      !/\d+%/.test(text), // Not statistical data
      !/(penelitian|studi|menurut)\s/i.test(text) // Not research references
    ];
    
    return indicators.filter(Boolean).length >= 4;
  }

  private static isLikelyNotHeading(text: string): boolean {
    const notHeadingPatterns = [
      /^(catatan|penting|ingat|perhatikan)/i,
      /\d+\s*(gram|mg|ml|liter|hari|tahun|kali)/i,
      /(sebanyak|sekitar|kurang lebih|lebih dari)/i,
      /^(dr\.|prof\.|ir\.)/i,
      /\b(website|email|telepon|alamat)\b/i
    ];
    
    return notHeadingPatterns.some(pattern => pattern.test(text));
  }

  private static removeDuplicates(items: TableOfContentsItem[]): TableOfContentsItem[] {
    const seen = new Set<string>();
    return items.filter(item => {
      const key = item.title.toLowerCase().replace(/[^\w\s]/g, '').slice(0, 20);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  static generateBestToC(content: string): TocGenerationResult {
    if (!content || content.length < this.MIN_CONTENT_LENGTH) {
      return { items: [], method: 'none', confidence: 0 };
    }

    // Try all methods and pick the best one
    const headingResult = this.generateFromHeadings(content);
    const fallbackResult = this.generateFallback(content);
    const autoResult = this.generateAuto(content);

    // Select the best result based on confidence and item count
    const results = [headingResult, fallbackResult, autoResult]
      .filter(result => result.items.length >= 2)
      .sort((a, b) => {
        // Prefer higher confidence, but also consider item count
        const scoreA = a.confidence + (a.items.length * 2);
        const scoreB = b.confidence + (b.items.length * 2);
        return scoreB - scoreA;
      });

    return results.length > 0 ? results[0] : { items: [], method: 'none', confidence: 0 };
  }
}

// React Hook for using the ToC generator
export function useTableOfContents(content: string) {
  const [tocResult, setTocResult] = React.useState<TocGenerationResult>({
    items: [],
    method: 'none',
    confidence: 0
  });

  React.useEffect(() => {
    if (!content) {
      setTocResult({ items: [], method: 'none', confidence: 0 });
      return;
    }

    const result = TableOfContentsGenerator.generateBestToC(content);
    setTocResult(result);
    
    console.log('📋 ToC Generation Result:', {
      method: result.method,
      itemCount: result.items.length,
      confidence: result.confidence,
      items: result.items.map(item => ({
        title: item.title,
        type: item.type,
        level: item.level
      }))
    });
    
  }, [content]);

  return tocResult;
}