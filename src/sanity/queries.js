export const AGENT_QUERY = `*[_type == "agent" && _id == "agent-profile"][0] {
  name, title, realtorNumber, phone, email,
  instagram, facebook, linkedin,
  photo,
  bio,
  stats,
  team[] { name, role, bio, photo }
}`;

export const LISTINGS_QUERY = `*[_type == "listing"] | order(displayOrder asc, _createdAt desc) {
  _id,
  address, city, state, zip,
  price, beds, baths, sqft, lotSize, garage, stories, yearBuilt,
  mlsId, status, propertyType, architecturalStyle,
  hoaDues, propertyTaxPct, loanTerm, downPaymentPct,
  schools, exterior, interior, features, description,
  photos,
  displayOrder
}`;

export const ARTICLES_QUERY = `*[_type == "article"] | order(displayOrder asc, _createdAt desc) {
  _id,
  category, title, summary, date, source, sourceUrl, readTime
}`;

export const REVIEWS_QUERY = `*[_type == "review"] | order(displayOrder asc, _createdAt desc) {
  _id,
  name, rating, text, location
}`;
