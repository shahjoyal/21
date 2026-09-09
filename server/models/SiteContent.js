import mongoose from 'mongoose';

// A single document holding every editable piece of marketing copy as a
// flat key -> string map, e.g. { "hero_headline_en": "...", "hero_headline_mr": "..." }.
// The frontend always has a hardcoded default for every key (see
// src/data/siteContent.ts), so a missing or empty key here just means
// "use the default" — nothing breaks if this collection is empty.
const siteContentSchema = new mongoose.Schema(
  {
    singletonKey: { type: String, default: 'site_content', unique: true },
    values: { type: Map, of: String, default: {} },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model('SiteContent', siteContentSchema);
