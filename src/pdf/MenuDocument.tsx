import React from 'react';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { MenuBlock, Price, ServiceMenu } from '../data/menus/types';
import { LOGO_PNG_PATH } from './paths';

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
    paddingVertical: 56,
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
    position: 'absolute',
    bottom: 40,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: brand.softLine,
    paddingTop: 16,
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

function CoverPage({ displayName }: { displayName: string }) {
  return (
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverAccentBar}>
        <View style={styles.coverAccentAmber} />
        <View style={styles.coverAccentOrange} />
        <View style={styles.coverAccentPink} />
      </View>
      <View style={styles.coverBody}>
        <Image src={LOGO_PNG_PATH} style={styles.coverLogo} />
        <Text style={styles.coverServiceName}>{displayName}</Text>
        <Text style={styles.coverSubtitle}>Treatment menu</Text>
        <Text style={styles.coverTagline}>
          Bespoke beauty in the heart of Bermondsey — care, artistry, and renewal.
        </Text>
      </View>
      <View style={styles.coverFooter}>
        <Text style={styles.coverFooterBrand}>Saramonse Beauty</Text>
        <Text style={styles.coverFooterMeta}>Bermondsey, London (SE1) · 0777 388 1815</Text>
      </View>
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
          <Text style={styles.headerBrand}>Saramonse Beauty</Text>
          <Text style={styles.headerService}>{menu.displayName}</Text>
        </View>
      </View>
      <Text
        style={styles.footerPageNum}
        fixed
        render={({ pageNumber, totalPages }) => {
          const menuPageCount = totalPages - 1;
          if (pageNumber < 2 || menuPageCount < 2) return '';
          return `Page ${pageNumber - 1} of ${menuPageCount}`;
        }}
      />
      {menu.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </Page>
  );
}

export function MenuDocument({ menu }: { menu: ServiceMenu }) {
  return (
    <Document title={`${menu.displayName} — Menu`} language="en" creator="Saramonse Beauty">
      <CoverPage displayName={menu.displayName} />
      <InnerPages menu={menu} />
    </Document>
  );
}
