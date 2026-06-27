/**
 * Centralised image library for Tujenge.
 *
 * All Unsplash URLs use the official CDN with on-the-fly resizing via `?w=` and `?q=`.
 * Originals are linked at the bottom of each entry.
 *
 * Convention: `?w=1600&q=80&auto=format&fit=crop` — auto-format picks AVIF/WebP when supported.
 */

const unsplash = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const images = {
  // ── Hero ──────────────────────────────────────────────────────
  heroConstruction: unsplash('photo-1541888946425-d81bb19240f5', 1920, 85),
  heroConstructionAlt: unsplash('photo-1503387762-592deb58ef4e', 1920, 85),
  heroLuxury: unsplash('photo-1600596542815-ffad4c1539a9', 1920, 85),

  // ── Trust / Process illustrations ─────────────────────────────
  handshake: unsplash('photo-1521791136064-7986c2920216', 1200, 80),
  blueprint: unsplash('photo-1503387837-b154d5074bd2', 1200, 80),
  safetyGear: unsplash('photo-1581094794329-c8112a89af12', 1200, 80),
  siteAerial: unsplash('photo-1504307651254-35680f356dfd', 1200, 80),

  // ── Marketplace listings (Properties) ─────────────────────────
  propertyLuxury1: unsplash('photo-1613490493576-7fde63acd811', 1200, 85),
  propertyVilla1: unsplash('photo-1600596542815-ffad4c1539a9', 1200, 85),
  propertyModern1: unsplash('photo-1600585154340-be6161a56a0c', 1200, 85),
  propertyPlot1: unsplash('photo-1500382017468-9049fed747ef', 1200, 80),
  propertyPlot2: unsplash('photo-1542601906990-b4d3fb778b09', 1200, 80),
  propertyApartment1: unsplash('photo-1545324418-cc1a3fa10c00', 1200, 85),
  propertyApartment2: unsplash('photo-1502672260266-1c1ef2d93688', 1200, 85),
  propertyCommercial: unsplash('photo-1486406146926-c627a92ad1ab', 1200, 85),
  propertyInterior1: unsplash('photo-1600210492486-724fe5c67fb0', 1200, 85),
  propertyInterior2: unsplash('photo-1600607687939-ce8a6c25118c', 1200, 85),

  // ── Contractors & workers ────────────────────────────────────
  contractor1: unsplash('photo-1581244277943-fe4a9c777189', 1200, 80),
  contractor2: unsplash('photo-1503387762-592deb58ef4e', 1200, 80),
  contractor3: unsplash('photo-1521783988139-89397d761dce', 1200, 80),
  worker1: unsplash('photo-1581094288338-2314dddb7ece', 1200, 80),
  worker2: unsplash('photo-1568605117036-5fe5e7bab0b7', 1200, 80),

  // ── Materials ────────────────────────────────────────────────
  materialCement: unsplash('photo-1565793298595-6a879b1d9492', 1200, 80),
  materialSteel: unsplash('photo-1581244277943-fe4a9c777189', 1200, 80),
  materialSand: unsplash('photo-1518709268805-4e9042af9f23', 1200, 80),
  materialBricks: unsplash('photo-1565793298595-6a879b1d9492', 1200, 80),
  materialTimber: unsplash('photo-1518709268805-4e9042af9f23', 1200, 80),
  materialTiles: unsplash('photo-1584622781564-1d987f7333c1', 1200, 80),
  materialPaint: unsplash('photo-1562259949-e8e7689d7828', 1200, 80),
  materialRoofing: unsplash('photo-1632935190508-b14c6c0e1cab', 1200, 80),

  // ── Equipment ────────────────────────────────────────────────
  equipmentExcavator: unsplash('photo-1581094288338-2314dddb7ece', 1200, 80),
  equipmentCrane: unsplash('photo-1581092334651-ddf26d9a09d0', 1200, 80),
  equipmentMixer: unsplash('photo-1530124566582-a618bc2615dc', 1200, 80),
  equipmentGenerator: unsplash('photo-1581094288338-2314dddb7ece', 1200, 80),
  equipmentForklift: unsplash('photo-1565793298595-6a879b1d9492', 1200, 80),

  // ── Africa + Diaspora ────────────────────────────────────────
  africaSkyline: unsplash('photo-1494522855154-9297ac14b55f', 1200, 85),
  africanHome: unsplash('photo-1604999333679-b86d54738315', 1200, 85),
  africanConstruction: unsplash('photo-1541888946425-d81bb19240f5', 1200, 85),
  happyFamily: unsplash('photo-1582213782179-e0d53f98f2ca', 1200, 80),
  handShakeBusiness: unsplash('photo-1521791136064-7986c2920216', 1200, 80),
  architectPortrait: unsplash('photo-1573496359142-b8d87734a5a2', 600, 80),
  engineerPortrait: unsplash('photo-1568602471122-7832951cc4c5', 600, 80),
  contractorPortrait: unsplash('photo-1507003211169-0a1dd7228f2d', 600, 80),
  homeownerPortrait: unsplash('photo-1573497019940-1c28c88b4f3e', 600, 80),
  buyerPortrait: unsplash('photo-1494790108377-be9c29b29330', 600, 80),
  supplierPortrait: unsplash('photo-1500648767791-00dcc994a43e', 600, 80),

  // ── Misc UI ──────────────────────────────────────────────────
  ctaBackground: unsplash('photo-1503387762-592deb58ef4e', 1920, 85),
  aboutHero: unsplash('photo-1504307651254-35680f356dfd', 1920, 85),
  trustHero: unsplash('photo-1521791136064-7986c2920216', 1920, 85),
  contactHero: unsplash('photo-1541888946425-d81bb19240f5', 1920, 85),
  blogHero1: unsplash('photo-1503387837-b154d5074bd2', 1200, 80),
  blogHero2: unsplash('photo-1503387762-592deb58ef4e', 1200, 80),
  blogHero3: unsplash('photo-1541888946425-d81bb19240f5', 1200, 80),
} as const;

export type ImageKey = keyof typeof images;
