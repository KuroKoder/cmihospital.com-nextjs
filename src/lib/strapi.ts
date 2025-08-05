export async function getArtikelBySlug(slug: string) {
  const res = await fetch(`${process.env.STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`, {
    next: { revalidate: 3600 }, // ISR tiap 1 jam
  });
  const json = await res.json();
  return json.data?.[0];
}

export async function getAllSlugs() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/articles?fields=slug&pagination[pageSize]=100`, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  return json.data || [];
}
export async function getAllArticles() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/articles?populate=*`, {
    next: { revalidate: 3600 }, // ISR tiap 1 jam
  });
  const json = await res.json();
  return json.data || [];
}