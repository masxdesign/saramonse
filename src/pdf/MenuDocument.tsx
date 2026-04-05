import React from 'react';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import contact from '../data/contact.json';
import type { MenuBlock, Price, ServiceMenu } from '../data/menus/types';
import { LOGO_PNG_PATH } from './paths';

/** Service name + PDF page where that service section starts (its cover page). */
export type TocEntry = { name: string; page: number };

const brand = {
  cream: '#f8f6f3',
  paper: '#fdfcfa',
  ink: '#111827',
  muted: '#6b7280',
  softLine: '#e8ddd4',
  amber: '#fbbf24',
  orange: '#fb923c',
  pink: '#ec4899',
};

const styles = StyleSheet.create({
  coverPage: {
    backgroundColor: brand.cream,
    padding: 0,
    fontFamily: 'Helvetica',
    flexDirection: 'column',
  },
  coverColumn: {
    flex: 1,
    flexDirection: 'column',
    minHeight: '100%',
  },
  coverAccentBar: {
    flexDirection: 'row',
    height: 8,
    width: '100%',
  },
  coverAccentAmber: { flex: 1, backgroundColor: brand.amber },
  coverAccentOrange: { flex: 1, backgroundColor: brand.orange },
  coverAccentPink: { flex: 1, backgroundColor: brand.pink },
  coverBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingTop: 32,
    paddingBottom: 24,
  },
  coverLogo: {
    width: 168,
    height: 168,
    objectFit: 'contain',
    marginBottom: 36,
  },
  coverServiceName: {
    fontFamily: 'Times-Roman',
    fontSize: 38,
    letterSpacing: 6,
    textTransform: 'uppercase',
    color: brand.ink,
    textAlign: 'center',
    marginBottom: 14,
  },
  coverSubtitle: {
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: brand.muted,
    textAlign: 'center',
    marginBottom: 8,
  },
  coverTagline: {
    fontSize: 9,
    color: brand.muted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 28,
    maxWidth: 280,
    lineHeight: 1.5,
  },
  coverFooter: {
    flexShrink: 0,
    marginHorizontal: 48,
    marginBottom: 40,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: brand.softLine,
    alignItems: 'center',
  },
  coverFooterBrand: {
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: brand.ink,
    marginBottom: 4,
  },
  coverFooterMeta: {
    fontSize: 8,
    color: brand.muted,
    textAlign: 'center',
  },

  coverMasterFrame: {
    flex: 1,
    margin: 14,
    borderWidth: 3,
    borderColor: brand.pink,
    backgroundColor: brand.cream,
    flexDirection: 'column',
  },
  coverMasterInner: {
    flex: 1,
    flexDirection: 'column',
    minHeight: '100%',
  },
  coverMasterAccentBar: {
    height: 22,
  },
  coverMasterLogo: {
    width: 196,
    height: 196,
    objectFit: 'contain',
    marginBottom: 28,
  },
  coverMasterTitle: {
    fontSize: 46,
    letterSpacing: 8,
    marginBottom: 18,
  },
  coverMasterSubtitle: {
    fontSize: 12,
    letterSpacing: 4,
    color: brand.pink,
    fontWeight: 700,
  },
  coverMasterRibbon: {
    flexShrink: 0,
    height: 6,
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 0,
  },
  coverMasterRibbonAmber: { flex: 1, backgroundColor: brand.amber, opacity: 0.85 },
  coverMasterRibbonOrange: { flex: 1, backgroundColor: brand.orange, opacity: 0.85 },
  coverMasterRibbonPink: { flex: 1, backgroundColor: brand.pink, opacity: 0.85 },

  tocPage: {
    backgroundColor: brand.paper,
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: 'Helvetica',
  },
  tocAccentBar: {
    flexDirection: 'row',
    height: 5,
    marginBottom: 28,
    marginHorizontal: -8,
  },
  tocHeading: {
    fontFamily: 'Times-Roman',
    fontSize: 26,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: brand.ink,
    marginBottom: 8,
  },
  tocSubheading: {
    fontSize: 9,
    color: brand.muted,
    marginBottom: 28,
    lineHeight: 1.5,
  },
  tocRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  tocName: {
    fontSize: 12,
    fontWeight: 700,
    color: brand.ink,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  tocLeader: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: brand.softLine,
    marginHorizontal: 10,
    marginBottom: 3,
    minHeight: 1,
  },
  tocPageNum: {
    fontSize: 12,
    fontWeight: 700,
    color: brand.pink,
    minWidth: 24,
    textAlign: 'right',
  },
  tocNote: {
    marginTop: 24,
    fontSize: 8,
    color: brand.muted,
    fontStyle: 'italic',
    lineHeight: 1.45,
  },

  innerPage: {
    backgroundColor: brand.paper,
    paddingTop: 88,
    paddingBottom: 48,
    paddingHorizontal: 40,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: brand.ink,
  },
  headerStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 5,
  },
  headerStripAmber: { flex: 1, backgroundColor: brand.amber },
  headerStripOrange: { flex: 1, backgroundColor: brand.orange },
  headerStripPink: { flex: 1, backgroundColor: brand.pink },
  headerRow: {
    position: 'absolute',
    top: 16,
    left: 40,
    right: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 44,
    height: 44,
    objectFit: 'contain',
  },
  headerTextCol: {
    flex: 1,
  },
  headerBrand: {
    fontSize: 8,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: brand.muted,
    marginBottom: 2,
  },
  headerService: {
    fontFamily: 'Times-Roman',
    fontSize: 14,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: brand.ink,
  },
  footerPageNum: {
    position: 'absolute',
    bottom: 28,
    left: 40,
    right: 40,
    fontSize: 8,
    color: brand.muted,
    textAlign: 'center',
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  sectionAccent: {
    width: 4,
    height: 18,
    backgroundColor: brand.pink,
    marginRight: 10,
  },
  sectionTitle: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: brand.ink,
    flex: 1,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  treatmentTitle: {
    fontSize: 10,
    fontWeight: 700,
    flex: 1,
    paddingRight: 8,
    color: brand.ink,
  },
  price: {
    fontSize: 10,
    fontWeight: 700,
    color: brand.ink,
  },
  priceFrom: {
    fontSize: 8,
    fontWeight: 400,
    marginRight: 4,
    color: brand.muted,
  },
  priceIntro: {
    color: brand.pink,
  },
  body: {
    fontSize: 9,
    lineHeight: 1.45,
    color: '#374151',
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: brand.softLine,
    marginVertical: 10,
  },
  fatTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
    color: brand.ink,
  },
  fatIntro: {
    marginBottom: 12,
    lineHeight: 1.45,
    color: '#374151',
  },
  underline: {
    textDecoration: 'underline',
    marginBottom: 8,
  },
  fatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fatLine: {
    flex: 1,
    paddingRight: 8,
    lineHeight: 1.45,
    color: brand.ink,
  },
  comingSoon: {
    textAlign: 'center',
    marginVertical: 16,
  },
  comingTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.4,
    marginBottom: 8,
    color: brand.ink,
  },
  comingMsg: {
    fontFamily: 'Times-Roman',
    fontSize: 18,
    color: brand.ink,
  },
  extrasHeader: {
    flexDirection: 'row',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: brand.softLine,
    paddingBottom: 4,
  },
  extrasColName: { width: '52%', fontSize: 8, fontWeight: 700 },
  extrasColH: { width: '24%', fontSize: 8, textAlign: 'right', color: brand.muted },
  extrasRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  removalGroupTitle: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 6,
    color: brand.ink,
  },
  removalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingLeft: 8,
  },
  quote: {
    fontSize: 11,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 14,
    lineHeight: 1.5,
    color: '#4b5563',
  },
});

function pounds(amount: string): string {
  return `£${amount}`;
}

function formatPrice(p: Price): string {
  if (p.kind === 'from') return `From ${pounds(p.amount)}`;
  if (p.kind === 'single') return pounds(p.amount);
  return p.slots.map((s) => `${s.label} | ${pounds(s.amount)}`).join('   ');
}

function RichBody({ body }: { body: import('../data/menus/types').RichContent[] }) {
  return (
    <>
      {body.map((seg, i) => {
        if (seg.kind === 'p') {
          return (
            <Text key={i} style={styles.body}>
              {seg.text}
            </Text>
          );
        }
        if (seg.kind === 'h4') {
          return (
            <Text key={i} style={[styles.body, styles.underline]}>
              {seg.text}
            </Text>
          );
        }
        return (
          <View key={i} style={{ marginBottom: 8, paddingLeft: 8 }}>
            {seg.items.map((li, j) => (
              <Text key={j} style={styles.body}>
                • {li}
              </Text>
            ))}
          </View>
        );
      })}
    </>
  );
}

function BlockView({ block }: { block: MenuBlock }) {
  if (block.type === 'section') {
    return (
      <View style={styles.sectionTitleRow} wrap={false}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionTitle}>{block.title}</Text>
      </View>
    );
  }

  if (block.type === 'simpleRow') {
    const intro = block.priceStyle === 'intro';
    const priceStyle = intro ? styles.priceIntro : {};
    const pk = block.price;
    return (
      <View wrap={false}>
        <View style={styles.rowHeader}>
          <Text style={styles.treatmentTitle}>{block.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            {pk.kind === 'from' ? (
              <>
                <Text style={styles.priceFrom}>From</Text>
                <Text style={[styles.price, priceStyle]}>{pounds(pk.amount)}</Text>
              </>
            ) : pk.kind === 'single' ? (
              <Text style={[styles.price, priceStyle]}>
                {pounds(pk.amount)}
                {block.priceNote ? `  ${block.priceNote}` : ''}
              </Text>
            ) : null}
          </View>
        </View>
        <Text style={styles.body}>{block.description}</Text>
        <View style={styles.divider} />
      </View>
    );
  }

  if (block.type === 'richRow') {
    return (
      <View wrap={false}>
        <View style={styles.rowHeader}>
          <Text style={styles.treatmentTitle}>{block.title}</Text>
          <Text style={styles.price}>{formatPrice(block.price)}</Text>
        </View>
        <RichBody body={block.body} />
        <View style={styles.divider} />
      </View>
    );
  }

  if (block.type === 'slotRow') {
    return (
      <View wrap={false}>
        <View style={styles.rowHeader}>
          <Text style={styles.treatmentTitle}>{block.title}</Text>
          <Text style={styles.price}>{formatPrice({ kind: 'slots', slots: block.slots })}</Text>
        </View>
        <Text style={styles.body}>{block.description}</Text>
        <View style={styles.divider} />
      </View>
    );
  }

  if (block.type === 'fatDissolve') {
    return (
      <View>
        <Text style={styles.fatTitle}>{block.sectionTitle}</Text>
        <Text style={styles.fatIntro}>{block.intro}</Text>
        <Text style={[styles.body, styles.underline]}>{block.listHeading}</Text>
        {block.rows.map((row, i) => (
          <View key={i} style={styles.fatRow}>
            <Text style={styles.fatLine}>
              <Text style={{ fontWeight: 700 }}>{row.bold}</Text> - {row.detail}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={styles.priceFrom}>From</Text>
              <Text style={styles.price}>{pounds(row.fromAmount)}</Text>
            </View>
          </View>
        ))}
        <Text style={[styles.body, { marginTop: 12 }]}>{block.footerNote}</Text>
        <View style={styles.divider} />
      </View>
    );
  }

  if (block.type === 'comingSoon') {
    return (
      <View style={styles.comingSoon}>
        <Text style={styles.comingTitle}>{block.title}</Text>
        <Text style={styles.comingMsg}>{block.message}</Text>
      </View>
    );
  }

  if (block.type === 'extrasGrid') {
    return (
      <View style={{ marginBottom: 12 }}>
        <View style={styles.extrasHeader}>
          <Text style={styles.extrasColName} />
          <Text style={styles.extrasColH}>{block.columnLabels[0]}</Text>
          <Text style={styles.extrasColH}>{block.columnLabels[1]}</Text>
        </View>
        {block.rows.map((row, i) => (
          <View key={i} style={styles.extrasRow}>
            <Text style={[styles.extrasColName, { fontWeight: 700 }]}>{row.name}</Text>
            <Text style={styles.extrasColH}>
              {row.hands.mode === 'from' ? `From ${pounds(row.hands.amount!)}` : extrasCellPdf(row.hands)}
            </Text>
            <Text style={styles.extrasColH}>
              {row.feet.mode === 'from' ? `From ${pounds(row.feet.amount!)}` : extrasCellPdf(row.feet)}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  if (block.type === 'removalGroup') {
    return (
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.removalGroupTitle}>{block.groupTitle}</Text>
        {block.items.map((item, i) => (
          <View key={i} style={styles.removalRow}>
            <Text style={{ flex: 1 }}>{item.label}</Text>
            <Text style={styles.price}>{pounds(item.amount)}</Text>
          </View>
        ))}
      </View>
    );
  }

  if (block.type === 'prose') {
    return (
      <Text style={styles.quote}>
        &ldquo;{block.text}&rdquo;
      </Text>
    );
  }

  return null;
}

function extrasCellPdf(cell: import('../data/menus/types').ExtrasCell): string {
  if (cell.mode === 'dash') return '—';
  if (cell.amount) return pounds(cell.amount);
  return '';
}

function CoverPage({
  displayName,
  subtitle = 'Treatment menu',
  variant = 'service',
}: {
  displayName: string;
  subtitle?: string;
  variant?: 'master' | 'service';
}) {
  const master = variant === 'master';

  const inner = (
    <View style={master ? styles.coverMasterInner : styles.coverColumn}>
      <View style={[styles.coverAccentBar, ...(master ? [styles.coverMasterAccentBar] : [])]}>
        <View style={styles.coverAccentAmber} />
        <View style={styles.coverAccentOrange} />
        <View style={styles.coverAccentPink} />
      </View>
      <View style={styles.coverBody}>
        <Image src={LOGO_PNG_PATH} style={master ? styles.coverMasterLogo : styles.coverLogo} />
        <Text style={[styles.coverServiceName, ...(master ? [styles.coverMasterTitle] : [])]}>
          {displayName}
        </Text>
        <Text style={[styles.coverSubtitle, ...(master ? [styles.coverMasterSubtitle] : [])]}>{subtitle}</Text>
        <Text style={styles.coverTagline}>{contact.location.coverTagline}</Text>
      </View>
      {master ? (
        <View style={styles.coverMasterRibbon}>
          <View style={styles.coverMasterRibbonAmber} />
          <View style={styles.coverMasterRibbonOrange} />
          <View style={styles.coverMasterRibbonPink} />
        </View>
      ) : null}
      <View style={styles.coverFooter}>
        <Text style={styles.coverFooterBrand}>{contact.businessName}</Text>
        <Text style={styles.coverFooterMeta}>
          {contact.location.short} · {contact.phone.display}
        </Text>
      </View>
    </View>
  );

  if (master) {
    return (
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverMasterFrame}>{inner}</View>
      </Page>
    );
  }

  return <Page size="A4" style={styles.coverPage}>{inner}</Page>;
}

function TableOfContentsPage({ entries }: { entries: TocEntry[] }) {
  return (
    <Page size="A4" style={styles.tocPage}>
      <View style={styles.tocAccentBar}>
        <View style={styles.headerStripAmber} />
        <View style={styles.headerStripOrange} />
        <View style={styles.headerStripPink} />
      </View>
      <Text style={styles.tocHeading}>Contents</Text>
      <Text style={styles.tocSubheading}>
        Page numbers point to each service menu cover (the next page begins prices and treatments).
      </Text>
      {entries.map((entry, i) => (
        <View key={i} style={styles.tocRow} wrap={false}>
          <Text style={styles.tocName}>{entry.name}</Text>
          <View style={styles.tocLeader} />
          <Text style={styles.tocPageNum}>{entry.page}</Text>
        </View>
      ))}
      <Text style={styles.tocNote}>
        Full brochure: all services in one file. Individual menus are also available on each service page of the
        website.
      </Text>
    </Page>
  );
}

function InnerPages({ menu }: { menu: ServiceMenu }) {
  return (
    <Page size="A4" style={styles.innerPage} wrap>
      <View style={styles.headerStrip} fixed>
        <View style={styles.headerStripAmber} />
        <View style={styles.headerStripOrange} />
        <View style={styles.headerStripPink} />
      </View>
      <View style={styles.headerRow} fixed>
        <Image src={LOGO_PNG_PATH} style={styles.headerLogo} />
        <View style={styles.headerTextCol}>
          <Text style={styles.headerBrand}>{contact.businessName}</Text>
          <Text style={styles.headerService}>{menu.displayName}</Text>
        </View>
      </View>
      <Text
        style={styles.footerPageNum}
        fixed
        render={({ pageNumber, totalPages }) =>
          totalPages > 1 ? `Page ${pageNumber} of ${totalPages}` : ''
        }
      />
      {menu.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </Page>
  );
}

export function MenuDocument({ menu }: { menu: ServiceMenu }) {
  return (
    <Document title={`${menu.displayName} — Menu`} language="en" creator={contact.businessName}>
      <CoverPage displayName={menu.displayName} />
      <InnerPages menu={menu} />
    </Document>
  );
}

/** Full brochure: master cover, contents, then each service with its own cover + menu pages. */
export function AllServicesMenuDocument({
  menus,
  tocEntries,
}: {
  menus: ServiceMenu[];
  tocEntries: TocEntry[];
}) {
  const pages: React.ReactElement[] = [
    <CoverPage
      key="cover-all"
      variant="master"
      displayName="All services"
      subtitle="Complete treatment menu"
    />,
    <TableOfContentsPage key="toc" entries={tocEntries} />,
  ];
  for (const menu of menus) {
    pages.push(
      <CoverPage key={`cover-${menu.serviceId}`} displayName={menu.displayName} />,
      <InnerPages key={`inner-${menu.serviceId}`} menu={menu} />,
    );
  }
  return (
    <Document title={`${contact.businessName} — Full menu`} language="en" creator={contact.businessName}>
      {pages}
    </Document>
  );
}
