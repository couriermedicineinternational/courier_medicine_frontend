/**
 * Dynamically applies Meta Title, Meta Description, and Meta Keywords to the document head
 */
export function applyPageSEO(metaViewTitle, metaDescription, metaKeywords, defaultTitle, defaultDesc, defaultKeywords) {
  const title = metaViewTitle || defaultTitle;
  if (title) {
    document.title = title;
  }

  const desc = metaDescription || defaultDesc;
  if (desc) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;
  }

  const keywords = metaKeywords || defaultKeywords;
  if (keywords) {
    let metaKw = document.querySelector('meta[name="keywords"]');
    if (!metaKw) {
      metaKw = document.createElement('meta');
      metaKw.name = 'keywords';
      document.head.appendChild(metaKw);
    }
    metaKw.content = keywords;
  }
}
