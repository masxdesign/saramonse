import type { MenuBlock, ServiceMenu } from './types';

/** Main treatment list (web: inside divide-y; PDF: first part of brochure). */
export const facialsMainBlocks: MenuBlock[] = [
    {
      type: 'simpleRow',
      title: 'Consultation',
      price: { kind: 'single', amount: '20' },
      description:
        'A detailed skin analysis and discussion to understand your concerns and goals, helping us recommend the most suitable treatments for your needs. (40mins)',
    },
    {
      type: 'simpleRow',
      title: 'Refresh Facial',
      price: { kind: 'single', amount: '40' },
      description:
        'Our Refresh Facial is a 30min treatment with cleanse, exfoliation, mask and hydration. A quick yet effective boost for refreshed, glowing skin. Perfect for a lunch time pick me up or before an event.',
    },
    {
      type: 'simpleRow',
      title: 'Deep Cleansing Facial',
      price: { kind: 'single', amount: '55' },
      description:
        'Give your skin the deep reset it deserves. This 60 minute treatment combines a thorough cleanse, exfoliation, steam and extractions (if needed) to clear away impurities and unclog pores. A purifying mask and hydrating finish will leave your complexion balanced, refreshed and glowing.',
    },
    {
      type: 'simpleRow',
      title: 'Dermaplaning',
      price: { kind: 'single', amount: '60' },
      description:
        "Reveal instantly smoother, brighter skin with our Dermaplaning Facial. This gentle treatment uses a surgical blade to carefully exfoliate the skin's surface, removing dead skin cells and fine \"peach fuzz\". The result is a radiant complexion, better product absorption and a flawless base for makeup. Treatment is finished with a soothing mask and hydrating cream. (60mins)",
    },
    {
      type: 'simpleRow',
      title: 'Microdermabrasion (Skin Base)',
      price: { kind: 'single', amount: '45' },
      description:
        'Experience a professional deep exfoliation with our SkinBase Microdermabrasion Facial. Using fine crystals, this treatment gently removes dead skin cells, unclogs pores and stimulates cell renewal for a smoother, clearer, and brighter complexion. Your treatment is finished with a calm mask and nourishing cream. (45mins)',
    },
    {
      type: 'simpleRow',
      title: 'Hydrofacial',
      price: { kind: 'single', amount: '99' },
      description:
        'Our Hydro-Facial is a results driven treatment that combines deep cleansing exfoliation, hydration and targeted serums to refresh and revitalise your skin. Using advanced hydro-technology, the treatment removes impurities while infusing nourishing ingredients to leave your complexion smoother, brighter and deeply hydrated. (90mins)',
    },
    {
      type: 'simpleRow',
      title: 'SM Vitamin Facial',
      price: { kind: 'from', amount: '50' },
      description:
        'Our Vitamin Infusion Facial uses advanced infusion techniques with targeted serums to deliver essential vitamins, antioxidants, and active ingredients directly into the skin. This treatment helps to deeply hydrate, brighten, and revitalise, while boosting collagen production and protecting against environmental damage. Ideal for tired, dull, or stressed skin in need of an instant refresh and long-term nourishment. Includes cleansing, exfoliation, mask and protective cream. (60mins)',
    },
    {
      type: 'simpleRow',
      title: 'Collagen Lift (Skin Base)',
      price: { kind: 'from', amount: '70' },
      description:
        'Our SkinBase Collagen Lift Facial uses advanced radio frequency technology to stimulate collagen and elastin production, tightening and toning the skin naturally. This non-invasive treatment helps to smooth fine lines and wrinkles, lift and firm the contours of the face, and improve overall skin texture. Perfect for clients looking for a natural alternative to injectables with no downtime. (60mins) (Best results are achieved with a course of treatments.)',
    },
    {
      type: 'simpleRow',
      title: 'Soft Pro Peeling',
      price: { kind: 'from', amount: '60' },
      description:
        'Our Soft Professional Peel is a results-driven facial peel using up to 20% AHA and BHA acids to gently resurface the skin. This treatment removes dead skin cells, unclogs pores, and stimulates cell renewal, leaving the complexion smoother, brighter, and more even in tone. This treatment is ideal for dull or uneven skin tone, fine lines and early ageing, oily congested or blemished skin and mild acne scarring. This peel can be performed as a standalone session for an instant glow, or as part of a course for long-term skin correction and renewal. (60mins)',
    },
    {
      type: 'richRow',
      title: 'Professional Cosmelan Treatment',
      price: { kind: 'single', amount: '970' },
      body: [
        {
          kind: 'p',
          text:
            "The Cosmelan® Professional Peel from Mesoesthetic is the world's leading depigmentation treatment, designed to target and correct all types of hyperpigmentation; including melasma, sun spots, age spots, and post-inflammatory marks.",
        },
        {
          kind: 'p',
          text:
            'This medical-grade peel works by inhibiting melanin production, visibly reducing dark patches and creating a more even, radiant complexion. Results are noticeable within weeks and continue to improve over time with the full aftercare protocol.',
        },
        { kind: 'h4', text: 'Includes' },
        {
          kind: 'ul',
          items: [
            'In clinic peel application',
            'Pre and Post maintenance kit (For Homecare and essential for long-lasting results)',
            'Follow-up reviews',
          ],
        },
        {
          kind: 'p',
          text: 'Treatment time: Approx. 45–60 minutes (single in-clinic session + homecare)',
        },
        { kind: 'p', text: 'A prior consultation is essential before booking this treatment.' },
      ],
    },
];

export const facialsAddOnBlocks: MenuBlock[] = [
  {
    type: 'simpleRow',
    title: 'Add on Microdermabrasion',
      price: { kind: 'single', amount: '20' },
      description:
        'Boost your results with a deep exfoliation that removes dead skin cells and unclogs pores, leaving your skin smoother and brighter. Can be added to: Deep Cleansing Facial, Vitamin Infusion Facial.',
    },
    {
      type: 'simpleRow',
      title: 'Add On LED Light Therapy',
      price: { kind: 'single', amount: '20' },
      description:
        'Target specific skin concerns with soothing LED light therapy. Red light stimulates collagen and calms inflammation, while blue light helps reduce bacteria and blemishes, leaving skin balanced and rejuvenated. Can be added to: Dermaplaning Facial, HydroFacial, Vitamin Infusion Facial, Microdermabrasion, Collagen Lift.',
  },
];

export const facialsMenu: ServiceMenu = {
  serviceId: 'facials',
  displayName: 'Facials',
  pdfFileName: 'facials-menu.pdf',
  blocks: [...facialsMainBlocks, { type: 'section', title: 'Add Ons' }, ...facialsAddOnBlocks],
};
