export const googleSummary = {
  rating: 4.7,
  count: 636,
  capturedOn: "2026-09-29",
  reviewsUrl: "https://www.google.com/maps/place/Angel+salon+%26+Academy/@19.0850718,72.9121454,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c7a56b0b4e27:0x2f5182fec860269a!8m2!3d19.0850718!4d72.9121454!16s%2Fg%2F11rl9hc09h!18m1!1e1?entry=ttu",
} as const;

export type GoogleReview = { id: string; name: string; text: string; source: "Google"; possiblyTruncated: boolean };

export const googleReviews: GoogleReview[] = [
 { id:"r1", name:"Mamta Bhogle", source:"Google", possiblyTruncated:false, text:"My hair was dry and hair color was patchy. They did botox treatment, i just love the results. They did no ammonia color. Final result is excellent. Highly recommended." },
 { id:"r2", name:"pankaj kumar", source:"Google", possiblyTruncated:false, text:"Hello, did my nail extension from Angels salon. They did the best nail extension ever. They have plenty of shades to choose from. Best maintained hygiene. Highly recommended." },
 { id:"r3", name:"Saniya Khale", source:"Google", possiblyTruncated:false, text:"Best hair treatment done by Angels salon. Did my protein treatment here, my hair is frizz free, smooth, soft and shiny. Well trained staff." },
 { id:"r4", name:"Reshma Shelke", source:"Google", possiblyTruncated:false, text:"Best haircut done by jayesh kadam. Well maintained hygeine with trained staff. Highly appreciated and recommended" },
 { id:"r5", name:"komal gaisamudre", source:"Google", possiblyTruncated:false, text:"Best haircut have done in angels salon..even for my 6 year old girl also..highly recommend for haircut. Nice staff.." },
 { id:"r6", name:"Anita Choraghe", source:"Google", possiblyTruncated:false, text:"I did nanoplastia treatment from here, my hair is smooth and silky now. Highly recommended." },
 { id:"r7", name:"Anita Sathe", source:"Google", possiblyTruncated:false, text:"Best haircut. Best salon in ghatkopar east. Do visit her for all you skin, hair , nails and makeup requirement." },
 { id:"r8", name:"Shraddha Shirke", source:"Google", possiblyTruncated:true, text:"Had an amazing experience with Nano Plastia! The treatment turned out great and I absolutely loved the results. The staff members were such sweethearts — very honest, approachable, and made me feel completely comfortable throughout. Will definitely be visiting again!" },
 { id:"r9", name:"Rasika Varekar", source:"Google", possiblyTruncated:true, text:"I had an amazing facial experience! My skin feels incredibly soft, fresh, and glowing. The therapist was knowledgeable, gentle, and explained every step. The salon was clean, relaxing, and hygienic. Highly recommend." },
 { id:"r10", name:"Riya Sharma", source:"Google", possiblyTruncated:true, text:"Had a great experience at this salon! I opted for waxing, clean-up, and mani-pedi, and all the services were done with great care and hygiene. The staff is very genuine and friendly, which made the whole experience even more comfortable. Highly recommended!" },
];
