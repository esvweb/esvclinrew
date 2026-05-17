type TreatmentContent = {
  name: string
  slug: string
  description: string
  faqs: { q: string; a: string }[]
}

export const TREATMENT_CONTENT: Record<string, TreatmentContent> = {
  'hair-transplant': {
    name: 'Hair Transplant',
    slug: 'hair-transplant',
    description:
      'Esvita Clinic offers advanced hair transplant procedures using both FUE (Follicular Unit Extraction) and DHI (Direct Hair Implantation) techniques. Our team of experienced surgeons has helped hundreds of patients from across Europe achieve natural-looking, permanent results in Istanbul.',
    faqs: [
      {
        q: 'What hair transplant techniques does Esvita Clinic use?',
        a: 'Esvita Clinic offers both FUE (Follicular Unit Extraction) and DHI (Direct Hair Implantation) hair transplant techniques. During your consultation, our surgeons will recommend the most suitable approach based on your hair loss pattern and desired outcome.',
      },
      {
        q: 'How long does it take to see results after a hair transplant?',
        a: 'Most patients begin to see new hair growth at around 3–4 months after the procedure. Significant density improvement is typically visible at 6–8 months, with full results achieved at 12–18 months.',
      },
      {
        q: 'Is hair transplant in Istanbul safe?',
        a: 'Hair transplant at Esvita Clinic in Istanbul is performed by qualified surgeons in a modern, accredited facility. All procedures follow international medical standards. Our patient reviews from Italy, France, Germany, Russia and the UK reflect consistently high satisfaction rates.',
      },
    ],
  },
  'dental-treatment': {
    name: 'Dental Treatment',
    slug: 'dental-treatment',
    description:
      'Esvita Clinic provides a full range of dental treatments including porcelain veneers, zirconia crowns, dental implants, and full smile makeovers. International patients consistently report savings of 50–70% compared to prices in Western Europe, without compromising on quality.',
    faqs: [
      {
        q: 'What dental treatments are available at Esvita Clinic?',
        a: 'Esvita Clinic offers dental implants, porcelain veneers, zirconia crowns, teeth whitening, full mouth reconstruction, and cosmetic dentistry. Most smile makeover treatments can be completed within 5–7 days.',
      },
      {
        q: 'How much can I save on dental treatment in Istanbul?',
        a: 'Patients travelling from Germany, France, Italy, and the UK typically save between 50% and 70% on dental procedures at Esvita Clinic compared to prices in their home countries.',
      },
      {
        q: 'How long do I need to stay in Istanbul for dental treatment?',
        a: 'Most dental treatments at Esvita Clinic can be completed in 3–7 days depending on the complexity of the case. Implant treatments may require two visits separated by several months for the healing phase.',
      },
    ],
  },
  rhinoplasty: {
    name: 'Rhinoplasty',
    slug: 'rhinoplasty',
    description:
      'Esvita Clinic\'s plastic surgeons specialise in rhinoplasty for both functional and aesthetic improvement. Using advanced digital simulation technology, patients can visualise their expected results before the procedure. Istanbul is one of the world\'s leading destinations for rhinoplasty.',
    faqs: [
      {
        q: 'What types of rhinoplasty does Esvita Clinic perform?',
        a: 'Esvita Clinic performs both open and closed rhinoplasty techniques, as well as revision rhinoplasty. Procedures address cosmetic concerns such as bumps, tips, and asymmetry, as well as functional issues such as a deviated septum.',
      },
      {
        q: 'How long is the recovery after rhinoplasty?',
        a: 'Most patients are comfortable resuming light activities after 10–14 days. Splints and bandages are typically removed within one week. Swelling gradually resolves over 3–6 months, with final results visible at around one year.',
      },
      {
        q: 'Why choose Istanbul for rhinoplasty?',
        a: 'Istanbul has become a globally recognised centre for rhinoplasty, with highly experienced surgeons who perform a high volume of procedures annually. Prices are significantly lower than in Western Europe while maintaining international quality standards.',
      },
    ],
  },
  'beard-transplant': {
    name: 'Beard Transplant',
    slug: 'beard-transplant',
    description:
      'A beard transplant at Esvita Clinic can create a fuller, natural-looking beard for men with patchy or thin facial hair. Using the DHI technique, individual hair follicles are harvested from the scalp and implanted precisely to achieve the desired beard shape and density.',
    faqs: [
      {
        q: 'How does a beard transplant work?',
        a: 'A beard transplant uses the DHI technique to harvest hair follicles from the back of the scalp and implant them into the beard area. The procedure is performed under local anaesthesia and takes approximately 6–8 hours depending on the number of grafts required.',
      },
      {
        q: 'When will my beard transplant results be visible?',
        a: 'After an initial shedding phase at 2–4 weeks, new beard hair begins to grow at around 3 months. Most patients see significant density at 6 months, with full results at 12 months.',
      },
      {
        q: 'Is beard transplant painful?',
        a: 'The procedure is performed under local anaesthesia so patients feel minimal discomfort during the treatment. Some mild soreness and swelling in the treated area is normal for a few days afterwards.',
      },
    ],
  },
  'eyebrow-transplant': {
    name: 'Eyebrow Transplant',
    slug: 'eyebrow-transplant',
    description:
      'Esvita Clinic offers eyebrow transplant procedures for patients with sparse, patchy, or absent eyebrows caused by over-plucking, genetics, or medical conditions. The procedure restores natural-looking eyebrows with permanent results.',
    faqs: [
      {
        q: 'Who is a good candidate for eyebrow transplant?',
        a: 'Eyebrow transplant at Esvita Clinic is suitable for anyone experiencing sparse or absent eyebrows due to over-plucking, alopecia, scarring, or natural thinning. A consultation with our surgeon will determine if you are a suitable candidate.',
      },
      {
        q: 'How natural do eyebrow transplants look?',
        a: 'Our surgeons carefully design the eyebrow shape and angle to match natural growth patterns. The transplanted hairs grow permanently and can be trimmed and shaped just like natural eyebrows.',
      },
      {
        q: 'How long does eyebrow transplant recovery take?',
        a: 'Initial redness and scabbing resolve within 7–10 days. Transplanted hairs will shed at around 2–4 weeks before new permanent growth begins. Full results are typically visible at 9–12 months.',
      },
    ],
  },
}

export function getTreatmentContent(slug: string): TreatmentContent | undefined {
  return TREATMENT_CONTENT[slug]
}
