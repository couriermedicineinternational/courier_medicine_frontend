// Constants for Courier Medicine App
// No hardcoded strings in components. All strings are stored here.

export const TOP_BAR = {
  phone: {
    label: "Call Us:",
    number: "+91-8882691919",
    href: "tel:+918882691919"
  },
  whatsapp: {
    label: "Whatsapp:",
    number: "+91-8882691919",
    href: "https://wa.me/918882691919"
  },
  email: {
    label: "Email Us:",
    address: "couriermedicines@gmail.com",
    href: "mailto:couriermedicines@gmail.com"
  },
  workingHours: {
    label: "Working Hours:",
    hours: "Mon - Sat 09:00 - 19:00"
  }
};

export const NAVIGATION = {
  logo: {
    text: "Courier Medicine",
    subtext: "INTERNATIONAL SERVICES"
  },
  links: [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about.htm" },
    { 
      label: "Popular Countries", 
      path: "/countries.php",
      dropdown: [
        { label: "USA", path: "/countries.php" },
        { label: "UK", path: "/countries.php" },
        { label: "Canada", path: "/countries.php" },
        { label: "Australia", path: "/countries.php" },
        { label: "UAE", path: "/countries.php" },
        { label: "Zambia", path: "/countries.php" },
        { label: "Lebanon", path: "/countries.php" }
      ]
    },
    { 
      label: "Popular Locations", 
      path: "/location.php",
      dropdown: [
        { label: "Delhi NCR", path: "/location.php" },
        { label: "Mumbai", path: "/location.php" },
        { label: "Bangalore", path: "/location.php" },
        { label: "Punjab", path: "/location.php" },
        { label: "Kolkata", path: "/location.php" },
        { label: "Kerala", path: "/location.php" },
        { label: "Madhya Pradesh", path: "/location.php" }
      ]
    },
    { label: "Blog", path: "/blog.htm" },
    { label: "FAQ", path: "/faq.htm" },
    { label: "Contact", path: "/contact.htm" }
  ]
};

export const HERO = {
  bullets: [
    "Medicines Procurement Service on Customer behalf",
    "Free Doorstep Medicine Pickup From India and International Delivery",
    "Cheapest Courier rates.",
    "Help In Documentation",
    "Live Tracking",
    "24x7 Customer Support"
  ],
  form: {
    title: "Calculate Courier Charges",
    countryLabel: "Select Country",
    countryPlaceholder: "Select Country",
    locationLabel: "Select Your Location",
    locationPlaceholder: "Select City/State",
    medicineTypeLabel: "MEDICINES TYPE",
    medicineTypePlaceholder: "Select Medicine Type",
    mobileLabel: "MOBILE NO.*",
    mobilePlaceholder: "ENTER MOBILE NUMBER",
    prescriptionQuestion: "DO YOU HAVE PRESCRIPTION ?",
    prescriptionYes: "YES",
    prescriptionNo: "NO",
    submitButton: "Check Courier Charges"
  },
  countriesList: [
    { code: "US", name: "United States (USA)" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "GB", name: "United Kingdom (UK)" },
    { code: "AE", name: "United Arab Emirates (UAE)" },
    { code: "DE", name: "Germany" },
    { code: "SG", name: "Singapore" },
    { code: "NZ", name: "New Zealand" },
    { code: "HK", name: "Hong Kong" },
    { code: "ZM", name: "Zambia" },
    { code: "LB", name: "Lebanon" }
  ],
  locationsList: [
    { id: "delhi", name: "Delhi / NCR" },
    { id: "mumbai", name: "Mumbai" },
    { id: "bangalore", name: "Bangalore" },
    { id: "hyderabad", name: "Hyderabad" },
    { id: "chennai", name: "Chennai" },
    { id: "kolkata", name: "Kolkata" },
    { id: "pune", name: "Pune" },
    { id: "ahmedabad", name: "Ahmedabad" },
    { id: "punjab", name: "Punjab" },
    { id: "madhya_pradesh", name: "Madhya Pradesh" },
    { id: "j_and_k", name: "Jammu And Kashmir" },
    { id: "kerala", name: "Kerala" },
    { id: "chandigarh", name: "Chandigarh" },
    { id: "lucknow", name: "Lucknow" },
    { id: "other", name: "Other Location (India)" }
  ],
  medicineTypes: [
    { id: "allopathic", name: "Allopathic Medicines" },
    { id: "homeopathic", name: "Homeopathic Medicines" },
    { id: "ayurvedic", name: "Ayurvedic Medicines" },
    { id: "unani", name: "Unani or Herbal Medicines" },
    { id: "critical", name: "Life Saving / Chronic Medicines" }
  ]
};

export const WHAT_MEDICINES = {
  title: "WHAT MEDICINES We Can Courier",
  subtext: "We Can Courier",
  boldTitle: "Courier Medicines Is Best Medicine Courier Company in India",
  descriptionParagraphs: [
    "We ship a wide range of medicines to meet your healthcare needs, from Liquid Medicines and allopathic Medicines to Ayurvedic Medicines and Homeopathic Medicines (including brands like Patanjali Medicines, Baidyanath, Zandu Ayurveda, Dabur India, SBL, Reckeweg, Lord's, Medisynth, New Life, REPL, St. George's, Wheezal Homeo pharma, Willmar Schwabe India).",
    "We cater to Medications for various conditions, including Chronic Diseases: Cancer, Diabetes, Heart diseases, Kidney diseases, HIV, STI, Hepatitis, Arthritis, Tuberculosis, Alzheimer, Lung Disease, Respiratory Diseases, Liver Diseases, Hypertension, heart conditions, and Common Ailments: Cough, fever, cold, sore throat, Skin infection, and Many more Disease.",
    "If you have any questions or need guidance on specific medications, feel free to contact our Medicine expert team. We are here to help you ensure get the right Medicine Couriered at your doorstep."
  ],
  contactPrompt: "Call / WhatsApp on +91-8882691919",
  contactSubPrompt: "Or E-Mail - couriermedicines@gmail.com"
};

export const WE_MADE_EASY = {
  title: "We Made Courier Medicines EASY",
  accordion: [
    {
      id: "A",
      title: "Free Door-to-Door Pickup & Delivery",
      content: "Courier Medicines offers completely free doorstep medical shipment collection. You do not need to visit our warehouse; our dedicated local courier agent will collect your medicines directly from your residence or pharmacy across any location in India."
    },
    {
      id: "B",
      title: "Reasonable rates",
      content: "We provide highly competitive and cheapest courier rates for global medicine delivery. Our structured corporate tie-ups with major international express partners ensure you receive premium high-speed courier solutions at heavily discounted pocket-friendly prices."
    },
    {
      id: "C",
      title: "Purchase of Medicines on your behalf",
      content: "If you cannot procure specific medicines locally, our specialized procurement desk can purchase them from certified authorized pharmacies in India on your behalf, aggregate them, verify the batch numbers/expiry dates, and ship them securely."
    },
    {
      id: "D",
      title: "Medicines Packing Services",
      content: "Courier Medicines helps in Packing also. As in case of pick up, the customer has to do the initial packing. Upon arrival at our warehouse, our team checks the condition of the medicines and determines the appropriate way, be it bubble wrap, thermacol, envelopes, or cardboard box to protect your medications from damage and maintaining their integrity throughout the delivery process."
    },
    {
      id: "E",
      title: "Guaranteed Delivery Timeline",
      content: "We understand that medicines are life-critical. That's why we operate on a strictly committed and guaranteed delivery schedule. Typically, international shipments are delivered within 3 to 5 business days, backed by express air transit corridors."
    },
    {
      id: "F",
      title: "24/7 Customer Support",
      content: "Need assistance with your package status or documentation queries at midnight? Our live support desk operates 24/7/365 to handle your urgent concerns immediately, assuring peace of mind at every milestone of your shipping experience."
    },
    {
      id: "G",
      title: "Easy Payment Options",
      content: "We offer smooth, hassle-free payment flexibilities including Online Direct Bank Transfers, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Card payments, and Stripe checkout options for global Indian diaspora customers."
    }
  ],
  graphic: {
    badge: "EXPRESS DELIVERY",
    buttonText: "Track Order",
    placeholder: "Enter tracking number..."
  }
};

export const BANNER = {
  title: "Easy Tracking and Express Door to Door Timely Delivery",
  leftButton: "Get A Quote",
  phoneButton: "+91-8882691919",
  whatsappButton: "+91-8882691919"
};

export const DOCUMENTATION = {
  title: "We Help You With",
  blueTitle: "DOCUMENTATION",
  accordion: [
    {
      id: "A",
      title: "Soft Copies of Prescriptions Required",
      content: "To initiate your medical shipment, we require a scan or clean photo of a valid prescription issued by a registered medical practitioner. This ensures compliance with international customs laws and pharmaceutical export statutes."
    },
    {
      id: "B",
      title: "Soft Copies of Bills Required",
      content: "A genuine purchase retail bill from a licensed medical store or pharmacy is mandatory. The name on the bill, prescription, and courier packing slip must correspond to maintain swift clearance without bureaucratic holdups."
    },
    {
      id: "C",
      title: "Medicine Export Invoice Preparation",
      content: "Our logistics documentation specialists will handle the complex process of structuring full customs commercial invoices, MSDS declarations, and pharmaceutical export cargo lists for zero stress on your end."
    },
    {
      id: "D",
      title: "Customs Clearance Assistance",
      content: "If your shipment Need help in customs clearance, Our team is there to Guide you through process to ensure your medicines are delivered promptly and efficiently. If any Financials involve to pay custom duty than receiver has to pay, As Courier Medicines don't have any Financial Interest into it."
    }
  ]
};

export const PROCESS_STEPS = {
  title: "Understand Our PROCESS In Steps",
  steps: [
    {
      step: "Step 1",
      title: "Booking",
      description: "Call for medicines delivery process and discounted prices."
    },
    {
      step: "Step 2",
      title: "Pick Up Or Procurement",
      description: "After booking Confirmation, Pick-up team or pharmacy will contact."
    },
    {
      step: "Step 3",
      title: "Warehouse Reach",
      description: "Once medicines Reaches our warehouse, Customer get Confirmation with Photo of Medicines."
    },
    {
      step: "Step 4",
      title: "Documentation Process",
      description: "Our team prepare the necessary documents for customs clearance as per international standards."
    },
    {
      step: "Step 5",
      title: "Packing",
      description: "Medicines are packed using bubble wrap or suitable box. After Packing, Photo is shared with customer."
    },
    {
      step: "Step 6",
      title: "Dispatch",
      description: "You will receive real-time tracking information to monitor your delivery."
    }
  ]
};

export const TESTIMONIALS = {
  sectionTitle: "Testimonials",
  title: "Customer Feedback",
  list: [
    {
      name: "Nijamuddin Parande",
      rating: 5,
      country: "Qatar",
      avatar: "NP",
      review: "I had a great experience using their medicine courier service from India to qatar the staff was helpful, responsive, and provided regular updates throughout the shipment process. The medicines were packed carefully and reached me safely",
      designation: "Verified Google Reviewer",
      date: "Posted a week ago"
    },
    {
      name: "Sayan Roy",
      rating: 4,
      country: "International",
      avatar: "SR",
      review: "Courier Medicine gets the job done but very expensive. Courier Medicine is a good service to order medicines from India to abroad. I recently ordered using them and had a nice experience.",
      designation: "Local Guide",
      date: "Posted 2 weeks ago"
    },
    {
      name: "Ragesh Ramakrishnan",
      rating: 5,
      country: "Saudi Arabia",
      avatar: "RR",
      review: "I had an excellent experience with this company for shipping medicines from India to Saudi Arabia. The entire process was smooth and well-coordinated. They ensured timely delivery without any delays, and the packaging was secure and handled",
      designation: "Verified Google Reviewer",
      date: "Posted a month ago"
    },
    {
      name: "Neethu Nair",
      rating: 5,
      country: "Australia",
      avatar: "NN",
      review: "I had a very good experience with this courier service for receiving medication from India to Australia. The process was smooth, reliable, and the delivery was handled professionally. Special thanks to Shivam for his excellent support",
      designation: "Verified Google Reviewer",
      date: "Posted 3 weeks ago"
    },
    {
      name: "Verified User",
      rating: 5,
      country: "International",
      avatar: "VU",
      review: "My package was well-packed and delivered responsibly. Vishal was helpful and highly responsive, answered all questions in detail and always replied without delay. All requested adjustments and accomodations were made like sending a picture",
      designation: "Verified Customer",
      date: "Posted a month ago"
    },
    {
      name: "Satrudhan Kushwaha",
      rating: 5,
      country: "Canada",
      avatar: "SK",
      review: "You can choose them if want exceptional customer satisfaction. They keep monitoring your parcel and keep you well updated at every point and tried to even call you in India midnight and update you which shows dedication towards customer service until my packet got delivered to canada my house. Keep it up vaibhav",
      designation: "Verified Customer",
      date: "Posted a month ago"
    },
    {
      name: "Manan Kapoor",
      rating: 5,
      country: "International",
      avatar: "MK",
      review: "Found them online. Spoke to Vishal. He patiently answered all my questions and explained the process. The pricing was good and the speed of delivery was great too. 5 days total and very thankful to have the medicines on time. Will definitely order again.",
      designation: "Local Guide",
      date: "Posted 2 months ago"
    },
    {
      name: "Sufiyan Khan",
      rating: 5,
      country: "Dubai",
      avatar: "SK",
      review: "I trusted Courier medicines for delivery as their chatting process was smooth and clear and never hesitate to inform you at every tracking points. I rarely review but on giving good service I can’t even refused if ask for. Got all medicine to Dubai packed in well.",
      designation: "Verified Customer",
      date: "Posted 2 months ago"
    },
    {
      name: "Arun Thakur",
      rating: 5,
      country: "Japan",
      avatar: "AT",
      review: "Delivery was easy no customs required to be paid. Initially they helped me so much that I gain instant trust on them and move forward with them for my medication to Japan.",
      designation: "Verified Customer",
      date: "Posted 2 weeks ago"
    },
    {
      name: "Firoza Hooda",
      rating: 5,
      country: "USA",
      avatar: "FH",
      review: "I had an excellent experience with this medical courier service for prescription medicines from India to the USA. They were very quick to respond to my queries and kept me updated at every step. Their team is extremely responsible.",
      designation: "Verified Customer",
      date: "Posted 9 months ago"
    },
    {
      name: "Sarfraj Ali Roohan",
      rating: 5,
      country: "Saudi Arabia",
      avatar: "SA",
      review: "God is the Witness this Provider always help me a lots politely and Courier my Purchased medicines as soon as possible in the Abroad country(KSA). I am too happy by their Assistance quickly and I got my Medication on the Time. Thank you.",
      designation: "Verified Customer",
      date: "Posted 3 months ago"
    },
    {
      name: "Nitin Ramrajpalli",
      rating: 4,
      country: "United Kingdom",
      avatar: "NR",
      review: "I highly recommend courier medicines for ordering your medicines from India. I recently ordered to uk. It came with a prescription. No extra taxes were charged upon delivery. Delivery was promised within 4-5 days but took around 10 days. Otherwise, every step of the process was very professionally handled.",
      designation: "Local Guide",
      date: "Posted 4 months ago"
    },
    {
      name: "Suraj Kumar",
      rating: 5,
      country: "Canada",
      avatar: "SK",
      review: "Courier price are affordable once you take quote from other courier agencies. They are great in delivering your need medicine on time to Calgary. Thanks",
      designation: "Verified Customer",
      date: "Posted 3 months ago"
    },
    {
      name: "Z K",
      rating: 5,
      country: "Australia",
      avatar: "ZK",
      review: "Used this platform to help me buy medicine on discount price and send Medicine to Australia. They shared the tracking which gave me confidence. Needing them again in August and will connect with you peps for sure.",
      designation: "Verified Customer",
      date: "Posted 4 weeks ago"
    },
    {
      name: "Ashith S",
      rating: 5,
      country: "International",
      avatar: "AS",
      review: "Ordered some medicines from Courier medicines international limited. The process was very smooth. I received my medicine in 5 days without any issue.. Really good service",
      designation: "Verified Customer",
      date: "Posted a month ago"
    },
    {
      name: "Darmiyan Singh Panwar",
      rating: 5,
      country: "Canada",
      avatar: "DS",
      review: "Definitely Suggest people to use the service for Canada. They purchased well geniune medicine from pharmacy and shared photo with me so I can be assured on this that no fake supply provided as there are many doing it. On bill they offered me 20% discount which I checked with many courier but somewhat was less than this.",
      designation: "Verified Customer",
      date: "Posted 7 months ago"
    },
    {
      name: "Devas Seth",
      rating: 5,
      country: "International",
      avatar: "DS",
      review: "Professional and quick service. The team procures the required medicines and shared the brand, expiry details before shipping. Shipping was done using a reputed courier service along with tracking details. They also take care of customs",
      designation: "Local Guide",
      date: "Posted 7 months ago"
    },
    {
      name: "Noah Mani",
      rating: 5,
      country: "Canada",
      avatar: "NM",
      review: "The service was quick without any hassle. I am totally satisfied. Delivered homoeopathic medicines safely from Lucknow, India to Toronto, Canada",
      designation: "Verified Customer",
      date: "Posted 9 months ago"
    },
    {
      name: "Sanjay Kumar",
      rating: 5,
      country: "United Kingdom",
      avatar: "SK",
      review: "Ordering the medicine with them means you are in secure place. They keep informing you on every step and keep communication always open. Thanks for communication and delivering well to UK.",
      designation: "Verified Customer",
      date: "Posted a month ago"
    },
    {
      name: "Sialkoti",
      rating: 5,
      country: "Ireland",
      avatar: "S",
      review: "I recently ordered a batch of medicines from India to Ireland, and I am extremely happy with the service and the overall experience. The team like danish bhai personally arranged and bought the medicines for me, saving me a lot of time.",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Aashu D",
      rating: 5,
      country: "International",
      avatar: "AD",
      review: "Nice experience with reasonable price and commendable service. A proper guidance for international medicine courier service. You can trust them.",
      designation: "Verified Customer",
      date: "Posted a month ago"
    },
    {
      name: "Kavitha Ashokan",
      rating: 5,
      country: "International",
      avatar: "KA",
      review: "They purchased the medicine and couriered it to us promptly. Their service is very reliable, and the customer support is excellent. They stayed connected throughout and kept us updated at every stage.",
      designation: "Verified Customer",
      date: "Posted 6 months ago"
    },
    {
      name: "Kamlesh Kumar",
      rating: 5,
      country: "USA",
      avatar: "KK",
      review: "Got very good delivery to Chicago. Every medicine was well packed and they provided Longest expiry of medicine.",
      designation: "Verified Customer",
      date: "Posted 3 months ago"
    },
    {
      name: "Abhishek Sharma",
      rating: 5,
      country: "Ireland",
      avatar: "AS",
      review: "100% satisfied with their service to ireland. Customer only expect timely delivery , Good price , and End to End Customer support. I got that so Giving 5 star to them",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Purushothama Raju",
      rating: 5,
      country: "Europe (Finland)",
      avatar: "PR",
      review: "I recently used their medicine courier service from India to Europe (Finland), and I’m very pleased with the experience. The team was professional, responsive, and kept me informed at every stage. The package was packed securely.",
      designation: "Verified Customer",
      date: "Posted 6 months ago"
    },
    {
      name: "Alex Louis",
      rating: 5,
      country: "Dubai",
      avatar: "AL",
      review: "All medicines were superbly packed from Hyderabad and well delivered to Dubai to my friend. I was worried about customs but they assured me they will handle and so do.",
      designation: "Verified Customer",
      date: "Posted 2 months ago"
    },
    {
      name: "Ali Haider",
      rating: 5,
      country: "United Kingdom",
      avatar: "AH",
      review: "Great Service and Reliable Delivery! I ordered my medicines from here and had a very good experience. The process was easy, and the delivery was quick and well-packed. Everything arrived on time",
      designation: "Verified Customer",
      date: "Posted 7 months ago"
    },
    {
      name: "Gir Bahadur",
      rating: 5,
      country: "International",
      avatar: "GB",
      review: "Appreciate your fast delivery. All thanks for super clean and clear communication. Medicine arrived on time as discussed on call.",
      designation: "Local Guide",
      date: "Posted 3 months ago"
    },
    {
      name: "Kenneth Jacob",
      rating: 5,
      country: "Qatar",
      avatar: "KJ",
      review: "I received my medicine to Qatar in well condition and in control temperature which was very very essential. I will definitely recommend everyone for this service. This is my first time posting review to anyone. They deserve it.",
      designation: "Verified Customer",
      date: "Posted 9 months ago"
    },
    {
      name: "Prabhjit Singh",
      rating: 4,
      country: "International",
      avatar: "PS",
      review: "Overall good experience. It took more days than expected for medicine to get delivered. They said some issue going with the courier service but they were helpful so Nevermind i got my medicine. I recommend courier service international if u want to order medicine abroad",
      designation: "Verified Customer",
      date: "Posted 6 months ago"
    },
    {
      name: "Amarjeet Singh",
      rating: 5,
      country: "USA",
      avatar: "AS",
      review: "Medicine buying process was so smooth I can trust to get medicine to USA and proceed step by step. It gave me assurance that they are genuine company running behind service.",
      designation: "Verified Customer",
      date: "Posted 3 months ago"
    },
    {
      name: "Mukilesh",
      rating: 5,
      country: "Canada",
      avatar: "M",
      review: "I recently used Courier Medicine to have essential medications delivered from India to Canada, and I am thoroughly impressed with their service. From start to finish, the entire process was smooth, transparent, and completely hassle-free.",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Parveen",
      rating: 5,
      country: "Dubai",
      avatar: "P",
      review: "I had a great experience with this courier company! I had requested them to procure some important medicine from India and deliver it to me in Dubai — and they managed everything seamlessly. The package arrived within 4-5 days, which is",
      designation: "Verified Customer",
      date: "Posted 11 months ago"
    },
    {
      name: "Azmaan",
      rating: 5,
      country: "USA",
      avatar: "A",
      review: "I had sent medicines to the US and am satisfied with the hassle free services provided. Package delivered on time. Courtesy and always available on call.",
      designation: "Verified Customer",
      date: "Posted 6 months ago"
    },
    {
      name: "Mera E. Beckford",
      rating: 5,
      country: "Kenya",
      avatar: "MB",
      review: "Straightforward. Medication arrived to Kenya timely. Genuine product. Customs fees were separate, but reasonable. 🙏🏾",
      designation: "Verified Customer",
      date: "Posted a month ago"
    },
    {
      name: "Abhishek Abhi",
      rating: 5,
      country: "Dubai",
      avatar: "AA",
      review: "No doubt on this service if you need good service. They are working hard to satisfy customers. They were quick to inform me about my medicine which was not approved to be sent to Dubai and they returned it back to the pharmacy and refunded",
      designation: "Verified Customer",
      date: "Posted 7 months ago"
    },
    {
      name: "Swati Sazawal",
      rating: 5,
      country: "Canada",
      avatar: "SS",
      review: "I found this service better than others in terms of pricing and Service. Got my package with all medicines to Canada. 100% Recommendation from my end.",
      designation: "Verified Customer",
      date: "Posted 2 months ago"
    },
    {
      name: "Nadra Parween",
      rating: 5,
      country: "Germany",
      avatar: "NP",
      review: "Among many searches I thought of giving them try considering the prices are less with earlier service I used. I am glad they got it delivered all medicine to Germany with no hurdles. Many many positive thanks",
      designation: "Verified Customer",
      date: "Posted 3 months ago"
    },
    {
      name: "Benjo Delarmente",
      rating: 5,
      country: "Philippines",
      avatar: "BD",
      review: "Used this service for some meds I needed in the Philippines. Ordered Saturday night and meds arrived Wednesday afternoon (approx 4 days). I tried them on a whim from a Google search not knowing if they were an actual business but I assure",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Bhoomika Sharma",
      rating: 5,
      country: "International",
      avatar: "BS",
      review: "Safely delivered all my medication. Absolutely best service. I can believe them without a question. 👍",
      designation: "Verified Customer",
      date: "Posted 4 weeks ago"
    },
    {
      name: "Priyanka",
      rating: 5,
      country: "USA",
      avatar: "P",
      review: "The Courier Medicines International Services Team is very efficient to deal with homeopathy bottles delivery to Atlanta USA. No Leakage or breakage. Thanks To Vaibhav and team for handling my concern well.",
      designation: "Verified Customer",
      date: "Posted 2 months ago"
    },
    {
      name: "Faizan Khan",
      rating: 5,
      country: "International",
      avatar: "FK",
      review: "Ordering via any courier you doubt will they be able to deliver or company is reliable and genuine. I came across on Google Courier medicines international service and scroll their reviews on google and even on trustpilot to be assured.",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Rati Sinha",
      rating: 5,
      country: "International",
      avatar: "RS",
      review: "I found this courier service very effective, delivered my medicines on time, I was worried as I was doing shipping 1st time, but everything was smooth",
      designation: "Verified Customer",
      date: "Posted a month ago"
    },
    {
      name: "Tehniyat Khalid",
      rating: 5,
      country: "USA",
      avatar: "TK",
      review: "All went well from starting to end. All medicines were delivered to USA with no skips. I appreciate them and recommend courier medicine to readers.",
      designation: "Verified Customer",
      date: "Posted 2 months ago"
    },
    {
      name: "Satyaprakash Verma",
      rating: 5,
      country: "Malaysia",
      avatar: "SV",
      review: "Received all medicines on time to Malaysia. Your guidance was well appreciated.",
      designation: "Verified Customer",
      date: "Posted 3 months ago"
    },
    {
      name: "Mohmmad Asad",
      rating: 5,
      country: "UAE",
      avatar: "MA",
      review: "Got delivery done from Brijnor to Sharjah without ant worry. They perfectly deal with all including money. Transaction was very clear.",
      designation: "Verified Customer",
      date: "Posted 4 months ago"
    },
    {
      name: "Rajan Sai",
      rating: 5,
      country: "Japan",
      avatar: "RS",
      review: "Its good to know people and company like this exits. I was on search at very early morning for courier company who can send medicine from India to Osaka. I message courier medicines and there were so fast in chatting and intiated a call so",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Sandip Ghorpade",
      rating: 5,
      country: "United Kingdom",
      avatar: "SG",
      review: "I had an excellent experience with Courier Medicines International Services. I ordered Ayurvedic medicine from India to the UK, and they handled the entire process smoothly. The team picked up the medicines directly from the doctor, packed",
      designation: "Verified Customer",
      date: "Posted 9 months ago"
    },
    {
      name: "Vinay Dabhi",
      rating: 5,
      country: "USA",
      avatar: "VD",
      review: "They are a very legit company and understand customer urgency to deliver medicine. They guided me well to deliver my medicine for the USA and touchwood all went well without any custom issues. The good part was they made me knowledgeable about it.",
      designation: "Verified Customer",
      date: "Posted 7 months ago"
    },
    {
      name: "Wasim Hussain",
      rating: 5,
      country: "International",
      avatar: "WH",
      review: "Review is something this company want to earn. They provided me 15% discount on medicine and made me directly pay ti pharmacy and just took courier charges no commission for buying medicine like most company doing these days. So great service.",
      designation: "Verified Customer",
      date: "Posted 10 months ago"
    },
    {
      name: "Sujit",
      rating: 5,
      country: "International",
      avatar: "S",
      review: "My friend recommended it to me and I am recommending it to more people as they deliver your meds needs on your table.",
      designation: "Verified Customer",
      date: "Posted 5 months ago"
    },
    {
      name: "Tej Bahadur Khasu",
      rating: 5,
      country: "Nepal",
      avatar: "TB",
      review: "Delivery to nepal was successfully done after So many discussions and chat with Courier Medicine team.",
      designation: "Verified Customer",
      date: "Posted 3 months ago"
    },
    {
      name: "Vinod Gautam",
      rating: 5,
      country: "Australia",
      avatar: "VG",
      review: "Perfect delivery to Australia. Go with them without giving a second thought. I used them for first time and will continue to do so when required.",
      designation: "Verified Customer",
      date: "Posted a month ago"
    },
    {
      name: "Jon",
      rating: 5,
      country: "International",
      avatar: "J",
      review: "Medicines ordered on Thursday, received on Monday! Quick and efficient service! Will place my second order soon.",
      designation: "Local Guide",
      date: "Posted 2 months ago"
    },
    {
      name: "Aussie Cossack",
      rating: 5,
      country: "International",
      avatar: "AC",
      review: "Trustworthy. For medication made in India to be shipped outside India, this is a very good service. When you try this company you will be pleasantly surprised by the excellent service this company provides. I wouldn't recommend any other!",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Praveen Kumar",
      rating: 5,
      country: "International",
      avatar: "PK",
      review: "All well efforts of this team for promptly delivery of medicine. All was critical cancer medicine and reached in well condition to receiver.",
      designation: "Verified Customer",
      date: "Posted 3 months ago"
    },
    {
      name: "Aadi Raj",
      rating: 5,
      country: "Germany",
      avatar: "AR",
      review: "After a lot of searching, where many services were unable to ship medicines to Europe, I finally found Courier Medicines. They successfully shipped medicines to Germany, a country where shipping medicines is notoriously difficult,",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Mridul Sudhakaran",
      rating: 5,
      country: "UAE",
      avatar: "MS",
      review: "Used their service for sending medicines from Kerala to UAE. Hassle free process. No head ache regarding documentation. Took me 8 days in total, beginning from free pick up from home to delivery at UAE address.",
      designation: "Verified Customer",
      date: "Posted 11 months ago"
    },
    {
      name: "Mohd Suhail",
      rating: 5,
      country: "International",
      avatar: "MS",
      review: "Initially, I faced some challenges as I’m new to sending medicines overseas. Fortunately, Akash from Courier Medicines was incredibly helpful, offering support throughout the entire process, and my package was delivered smoothly.",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Shahanwaj Ansari",
      rating: 5,
      country: "UAE",
      avatar: "SA",
      review: "Full efficiently working to get your medicine on time. Received all my medicine in Ajman except few which was not allowed But they guided me well. Full transparency",
      designation: "Verified Customer",
      date: "Posted 5 months ago"
    },
    {
      name: "Akash Jain",
      rating: 5,
      country: "International",
      avatar: "AJ",
      review: "We were highly impressed with their temperature-controlled service. My injections were delivered in a well-maintained cool box, ensuring proper conditions throughout transit. Thank you to the team.",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Md Sahban",
      rating: 5,
      country: "Qatar",
      avatar: "MS",
      review: "Fantastic service-prompt delivery with no errors in the address. Everything arrived smoothly and right on time. A big thank you to your courier for delivering my urgent medicine parcel in Qatar. Much appreciated!",
      designation: "Verified Customer",
      date: "Posted a year ago"
    },
    {
      name: "Nikita Patil",
      rating: 4,
      country: "Canada",
      avatar: "NP",
      review: "The delivery experience was great because the medicines reached the destination within 4 days as promised. The only issue was that some of the medicines couldn’t be shipped to Canada as they are not allowed there. I completely understand.",
      designation: "Verified Customer",
      date: "Posted 11 months ago"
    }
  ]
};

export const FOOTER = {
  about: {
    title: "About Company",
    text: "Courier Medicines Offers Free Pick Up Service All Across India with providing Medicine Procurement Facilities also, As we can courier to All International Countries USA Canada Australia China UAE Germany UK and many others."
  },
  informative: {
    title: "Informative Pages",
    links: [
      { label: "About Us", path: "/about.htm" },
      { label: "Faq", path: "/faq.htm" },
      { label: "Blog", path: "/blog.htm" },
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Refund Policy", path: "/refund-policy" },
      { label: "Contact", path: "/contact.htm" }
    ]
  },
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Popular Countries", path: "/countries.php" },
      { label: "India To Australia Medicine Courier Charges", path: "/countries.php?country=AU" },
      { label: "India To USA Medicine Courier Charges", path: "/countries.php?country=US" },
      { label: "India To Germany Medicine Courier Charges", path: "/countries.php?country=DE" },
      { label: "India To Hong Kong Medicine Courier Charges", path: "/countries.php?country=HK" },
      { label: "more..", path: "/countries.php" }
    ]
  },
  locateUs: {
    title: "Locate Us",
    address: "Shop No. 7, 1st Floor, Market, Block C, Nizamuddin West, New Delhi, Delhi-110013",
    email: "couriermedicines@gmail.com",
    phone: "+91-8882691919"
  },
  copyright: "2024 © All Rights Reserved, Courier Services"
};

export const FAQ_PAGE = {
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know about exporting and courier services of medicines from India.",
  questions: [
    {
      q: "Can we really send liquid medicines through courier?",
      a: "Yes, absolute! We are certified to handle liquid medicines properly. We employ specialized insulation and secondary leakproof bubble padding layers to make sure fluids arrive 100% dry and intact without spilling."
    },
    {
      q: "What documents are compulsory for custom clearance?",
      a: "The most important documents are a valid Rx prescription copy from a registered Doctor stating the exact drug names and chemical configurations, and a computerized, clean retail tax purchase invoice from the chemist matching the quantity exactly."
    },
    {
      q: "How many months of medicines can I send in one shipment?",
      a: "Under international customs guidelines, personal medical export is restricted to a maximum of 3 months (90 days) of supply per patient per shipment. We guide you carefully through sizing and limits."
    },
    {
      q: "What are the typical pricing ranges for international delivery?",
      a: "Courier charges depend purely on destination country, payload weight, volumetric dimensions, and whether insulation/cooling boxes are needed. Use our instant quote form on the homepage for customized heavily discounted rates."
    },
    {
      q: "Is insurance included for expensive lifesaving oncology drugs?",
      a: "Yes! We provide complete parcel damage and loss insurance covers for sensitive, critical, and high-value drugs (e.g. oncology, chronic cardiac items) so your valuable health parcels are fully protected."
    },
    {
      q: "How do I track my international medicine shipment?",
      a: "We provide a live tracking AWB number the moment your package is dispatched. You can track your parcel's journey globally on our website until it safely reaches the destination address."
    },
    {
      q: "Do you offer door pickup services for medicines in India?",
      a: "Yes, we provide free door pickup from most major cities and towns in India. Just book your shipment and our executive will safely collect the parcel and documents from your home."
    },
    {
      q: "Can I send Ayurvedic and Homeopathic medicines?",
      a: "Absolutely. We routinely ship Allopathic, Ayurvedic, Homeopathic, and Unani medicines. Just ensure you have the original doctor's prescription and pharmacy bill."
    },
    {
      q: "Are there any restrictions on what medicines I can send?",
      a: "Narcotics, sleeping pills, and restricted psychotropic substances cannot be shipped. All medicines must be legal for personal import in the destination country and accompanied by a valid Rx."
    },
    {
      q: "What happens if my parcel is held by customs?",
      a: "Our logistics team ensures full documentation compliance before dispatch. In rare cases of customs queries, our experts actively coordinate with local authorities to expedite clearance."
    }
  ]
};

export const BLOG_PAGE = {
  title: "Our Latest Medical Logistics Blog",
  subtitle: "Keep updated with international custom rules, shipping advice, and drug export regulations.",
  posts: [
    {
      id: 1,
      title: "How to Securely Ship Chronic Illness Medicines internationally from India",
      excerpt: "If you have family members abroad who rely on special chronic-care medications sourced from India, here is the complete checklist to prevent customs delays.",
      date: "May 24, 2026",
      readTime: "5 mins read",
      author: "Logistics Expert Team",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80"
    },
    {
      id: 2,
      title: "Understanding Liquid Medicine Packaging Guidelines for Flight Cargoes",
      excerpt: "Air pressure fluctuations in flight cargo holds can cause physical liquid bottles to swell or leak. See how Courier Medicines applies advanced techniques to ensure total safety.",
      date: "June 02, 2026",
      readTime: "4 mins read",
      author: "Packaging Lead",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
    },
    {
      id: 3,
      title: "Top 5 Countries with Strict Customs Policies on Imported Pharmaceuticals",
      excerpt: "Schengen zone, USA, and UK have precise guidelines. Learn about the exact details required on your Dr. Prescription to clear custom desks efficiently and swiftly.",
      date: "June 11, 2026",
      readTime: "7 mins read",
      author: "Global Compliance Manager",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80"
    },
    {
      id: 4,
      title: "DHL vs UPS: Which is Better for Shipping Medicines from India to Abroad?",
      excerpt: "Comparing transit times, cold-chain handling, customs expertise, and pricing for pharmaceutical shipments. Our real delivery data from 500+ orders tells the full story.",
      date: "June 14, 2026",
      readTime: "6 mins read",
      author: "Courier Comparison Desk",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80"
    },
    {
      id: 5,
      title: "Complete NRI Guide: Receiving Indian Medicines in USA, UK and Canada",
      excerpt: "Step-by-step guide for NRIs on how to legally and safely receive prescription medicines from India. Covers FDA, MHRA, and Health Canada import regulations for personal use.",
      date: "June 17, 2026",
      readTime: "8 mins read",
      author: "NRI Advisory Team",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80"
    },
    {
      id: 6,
      title: "How We Handle Temperature-Sensitive Insulin and Biologics Shipments",
      excerpt: "Insulin, biosimilars, and biologics demand strict 2°C–8°C cold-chain storage during transit. Discover the insulated packaging, ice-gel packs, and carrier protocols we use.",
      date: "June 19, 2026",
      readTime: "5 mins read",
      author: "Cold Chain Specialist",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80"
    },
    {
      id: 7,
      title: "What Documents Does Customs Require When Shipping Medicines from India?",
      excerpt: "A detailed breakdown of every document required: Rx prescription, GST invoice, customs declaration form, NOC, and packing list. Missing even one can delay or seize your parcel.",
      date: "June 21, 2026",
      readTime: "6 mins read",
      author: "Customs Documentation Team",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80"
    },
    {
      id: 8,
      title: "Shipping Medicines to the Middle East: UAE, Saudi Arabia & Qatar Rules",
      excerpt: "Gulf countries have some of the most specific pharmaceutical import regulations. Learn the approved list of medicines, quantity limits, and Arabic labeling requirements.",
      date: "June 23, 2026",
      readTime: "7 mins read",
      author: "Middle East Logistics Desk",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
    },
    {
      id: 9,
      title: "Why Indian Generic Medicines Are in High Demand Among NRIs Worldwide",
      excerpt: "Indian generic pharmaceuticals offer the same active compounds at a fraction of the branded price. Explore why lakhs of NRI families trust India-sourced generics for chronic conditions.",
      date: "June 25, 2026",
      readTime: "4 mins read",
      author: "Pharma Insights Desk",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80"
    }
  ]
};

export const CONTACT_PAGE = {
  title: "Get In Touch",
  subtitle: "Have questions about regulations, delivery times, or custom charges? We are ready to help.",
  officeTitle: "Our Delhi Main Branch",
  hoursTitle: "Work Timing",
  socialsTitle: "Connect With Us"
};

// List of all 45 countries/routes
export const ALL_COUNTRIES = [
  { code: "AU", name: "Australia", slug: "india-to-australia-medicine-courier-charges.htm", basePrice: 3400, advice: "TGA therapeutic items personal import scheme allows 3-month supply easily." },
  { code: "US", name: "United States (USA)", slug: "india-to-united-states-usa-medicine-courier-charges.htm", basePrice: 3300, advice: "FDA 510(k) Proxy clearance applied. No local sales tax up to $200 personal medicine value." },
  { code: "CA", name: "Canada", slug: "india-to-canada-medicine-courier-charges.htm", basePrice: 3200, advice: "Health Canada personal import regulations allow up to a 90-day supply with a doctor's prescription." },
  { code: "CN", name: "China", slug: "india-to-china-medicine-courier-charges.htm", basePrice: 2800, advice: "NMPA regulations apply. Valid doctor's prescription and clear invoice mandatory." },
  { code: "DE", name: "Germany", slug: "india-to-germany-medicine-courier-charges.htm", basePrice: 3200, advice: "BfArM import rules apply. Personal import allows up to 3-month supply with doctor's prescription." },
  { code: "HK", name: "Hong Kong", slug: "india-to-hong-kong-medicine-courier-charges.htm", basePrice: 2200, advice: "Department of Health regulations apply. Prescription must match patient details." },
  { code: "IE", name: "Ireland", slug: "india-to-ireland-medicine-courier-charges.htm", basePrice: 3100, advice: "HPRA rules apply. Doctor's prescription required for customs clearance." },
  { code: "JP", name: "Japan", slug: "india-to-japan-medicine-courier-charges.htm", basePrice: 3000, advice: "MHLW import certificate (Yakkan Shoumei) required for more than 1 month supply." },
  { code: "KW", name: "Kuwait", slug: "india-to-kuwait-medicine-courier-charges.htm", basePrice: 2000, advice: "MOH clearance required. Doctor's prescription and clear chemist bill mandatory." },
  { code: "NL", name: "Netherlands", slug: "india-to-netherlands-medicine-courier-charges.htm", basePrice: 3100, advice: "IGJ rules apply. Doctor's prescription required for customs clearance." },
  { code: "NZ", name: "New Zealand", slug: "india-to-new-zealand-medicine-courier-charges.htm", basePrice: 3500, advice: "Medsafe personal import scheme applies. Maximum 3-month supply allowed per shipment." },
  { code: "NG", name: "Nigeria", slug: "india-to-nigeria-medicine-courier-charges.htm", basePrice: 2900, advice: "NAFDAC clearance required. Doctor's prescription and chemist invoice mandatory." },
  { code: "OM", name: "Oman", slug: "india-to-oman-medicine-courier-charges.htm", basePrice: 2000, advice: "MOH clearance. Prescription and invoices are audited on arrival." },
  { code: "PH", name: "Philippines", slug: "india-to-philippines-medicine-courier-charges.htm", basePrice: 2700, advice: "FDA import clearance required. Valid prescription is mandatory." },
  { code: "PL", name: "Poland", slug: "india-to-poland-medicine-courier-charges.htm", basePrice: 3200, advice: "GIF rules apply. Doctor's prescription required for customs clearance." },
  { code: "PT", name: "Portugal", slug: "india-to-portugal-medicine-courier-charges.htm", basePrice: 3200, advice: "INFARMED rules apply. Doctor's prescription required for customs clearance." },
  { code: "QA", name: "Qatar", slug: "india-to-qatar-medicine-courier-charges.htm", basePrice: 2200, advice: "MOPH clearance. Doctor's prescription and chemist invoice mandatory." },
  { code: "SG", name: "Singapore", slug: "india-to-singapore-medicine-courier-charges.htm", basePrice: 2400, advice: "HSA approval verified. Personal imports of medicines require valid medical prescription copy." },
  { code: "ZA", name: "South Africa", slug: "india-to-south-africa-medicine-courier-charges.htm", basePrice: 3200, advice: "SAHPRA guidelines apply. Valid doctor's prescription is required." },
  { code: "ES", name: "Spain", slug: "india-to-spain-medicine-courier-charges.htm", basePrice: 3200, advice: "AEMPS rules apply. Doctor's prescription required for customs clearance." },
  { code: "LK", name: "Sri Lanka", slug: "india-to-sri-lanka-medicine-courier-charges.htm", basePrice: 1900, advice: "NMRA clearance required. Doctor's prescription and chemist invoice mandatory." },
  { code: "SE", name: "Sweden", slug: "india-to-sweden-medicine-courier-charges.htm", basePrice: 3200, advice: "Medical Products Agency rules apply. Doctor's prescription required." },
  { code: "GB", name: "United Kingdom (UK)", slug: "india-to-united-kingdom-uk-medicine-courier-charges.htm", basePrice: 3100, advice: "MHRA regulations checked. Medicines must display batch numbers. Under £135 tax-free." },
  { code: "FR", name: "France", slug: "india-to-france-medicine-courier-charges.htm", basePrice: 3200, advice: "ANSM rules apply. Doctor's prescription required for customs clearance." },
  { code: "DK", name: "Denmark", slug: "india-to-denmark-medicine-courier-charges.htm", basePrice: 3300, advice: "Danish Medicines Agency rules apply. Doctor's prescription required." },
  { code: "JO", name: "Jordan", slug: "india-to-jordan-medicine-courier-charges.htm", basePrice: 2500, advice: "JFDA rules apply. Doctor's prescription and chemist invoice mandatory." },
  { code: "LB", name: "Lebanon", slug: "india-to-lebanon-medicine-courier-charges.htm", basePrice: 2800, advice: "MOPH regulations checked. Standard clearance with doctor's invoice." },
  { code: "RO", name: "Romania", slug: "india-to-romania-medicine-courier-charges.htm", basePrice: 3300, advice: "ANMDMR rules apply. Doctor's prescription required for customs clearance." },
  { code: "BH", name: "Bahrain", slug: "india-to-bahrain-medicine-courier-charges.htm", basePrice: 2100, advice: "NHRA clearance. Doctor's prescription and chemist invoice mandatory." },
  { code: "MY", name: "Malaysia", slug: "india-to-malaysia-medicine-courier-charges.htm", basePrice: 2500, advice: "NPRA rules apply. Doctor's prescription required for customs clearance." },
  { code: "GH", name: "Ghana", slug: "india-to-ghana-medicine-courier-charges.htm", basePrice: 3100, advice: "FDA Ghana clearance. Doctor's prescription and commercial invoice mandatory." },
  { code: "KR", name: "South Korea", slug: "india-to-south-korea-medicine-courier-charges.htm", basePrice: 3000, advice: "MFDS rules apply. Doctor's prescription required. Max 3-month supply." },
  { code: "AE", name: "United Arab Emirates (UAE)", slug: "india-to-united-arab-emirates-uae-medicine-courier-charges.htm", basePrice: 1800, advice: "MOHAP approvals verified. Urgent express entry via Dubai / Abu Dhabi customs hubs." },
  { code: "TH", name: "Thailand", slug: "india-to-thailand-medicine-courier-charges.htm", basePrice: 2600, advice: "Thai FDA rules apply. Doctor's prescription and invoice required." },
  { code: "SA", name: "Saudi Arabia", slug: "india-to-saudi-arabia-medicine-courier-charges.htm", basePrice: 2300, advice: "SFDA regulations apply. Doctor's prescription and chemist invoice mandatory." },
  { code: "BE", name: "Belgium", slug: "india-to-belgium-medicine-courier-charges.htm", basePrice: 3200, advice: "FAMHP rules apply. Doctor's prescription required for customs clearance." },
  { code: "KE", name: "Kenya", slug: "india-to-kenya-medicine-courier-charges.htm", basePrice: 3000, advice: "PPB clearance. Doctor's prescription and commercial invoice required." },
  { code: "BJ", name: "Benin", slug: "india-to-benin-medicine-courier-charges.htm", basePrice: 3200, advice: "ABRP rules checked. Doctor's prescription and commercial invoice required." },
  { code: "IT", name: "Italy", slug: "india-to-italy-medicine-courier-charges.htm", basePrice: 3200, advice: "AIFA rules apply. Doctor's prescription required for customs clearance." },
  { code: "CM", name: "Cameroon", slug: "india-to-cameroon-medicine-courier-charges.htm", basePrice: 3300, advice: "MINSANTE regulations. Doctor's prescription and invoice required." },
  { code: "KH", name: "Cambodia", slug: "india-to-cambodia-medicine-courier-charges.htm", basePrice: 2800, advice: "MOH Cambodia clearance. Doctor's prescription and invoice required." },
  { code: "VN", name: "Vietnam", slug: "india-to-vietnam-medicine-courier-charges.htm", basePrice: 2700, advice: "MOH Vietnam rules apply. Doctor's prescription and invoice required." },
  { code: "RU", name: "Russia", slug: "india-to-russia-medicine-courier-charges.htm", basePrice: 3400, advice: "Minzdrav rules apply. Doctor's prescription required for customs clearance." },
  { code: "AU-DELHI", name: "Delhi to Australia", slug: "india-to-delhi-to-australia-medicine-courier-charges.htm", 
    basePrice: 3400, 
    isSpecial: true,
    advice: "TGA therapeutic items personal import scheme allows 3-month supply easily. Pick-up from Delhi NCR.",
    customTitle: "Send Medicine from Delhi to Australia" 
  },
  { code: "GM", name: "Gambia", slug: "india-to-gambia-medicine-courier-charges.htm", basePrice: 3300, advice: "MCA Gambia regulations. Doctor's prescription and invoice required." }
];

// List of all 14 pickup locations/cities in India
export const ALL_LOCATIONS = [
  { id: "ahmedabad-to-australia", city: "Ahmedabad", country: "Australia", name: "Ahmedabad to Australia", slug: "medicine-courier-from-ahmedabad-to-australia.htm" },
  { id: "ahmedabad-to-canada", city: "Ahmedabad", country: "Canada", name: "Ahmedabad to Canada", slug: "medicine-courier-from-ahmedabad-to-canada.htm" },
  { id: "ahmedabad-to-china", city: "Ahmedabad", country: "China", name: "Ahmedabad to China", slug: "medicine-courier-from-ahmedabad-to-china.htm" },
  { id: "ahmedabad-to-dubai", city: "Ahmedabad", country: "Dubai", name: "Ahmedabad to Dubai", slug: "medicine-courier-from-ahmedabad-to-dubai.htm" },
  { id: "ahmedabad-to-ghana", city: "Ahmedabad", country: "Ghana", name: "Ahmedabad to Ghana", slug: "medicine-courier-from-ahmedabad-to-ghana.htm" },
  { id: "ahmedabad-to-hong-kong", city: "Ahmedabad", country: "Hong Kong", name: "Ahmedabad to Hong Kong", slug: "medicine-courier-from-ahmedabad-to-hong-kong.htm" },
  { id: "ahmedabad-to-japan", city: "Ahmedabad", country: "Japan", name: "Ahmedabad to Japan", slug: "medicine-courier-from-ahmedabad-to-japan.htm" },
  { id: "ahmedabad-to-lebanon", city: "Ahmedabad", country: "Lebanon", name: "Ahmedabad to Lebanon", slug: "medicine-courier-from-ahmedabad-to-lebanon.htm" },
  { id: "ahmedabad-to-malaysia", city: "Ahmedabad", country: "Malaysia", name: "Ahmedabad to Malaysia", slug: "medicine-courier-from-ahmedabad-to-malaysia.htm" },
  { id: "ahmedabad-to-oman", city: "Ahmedabad", country: "Oman", name: "Ahmedabad to Oman", slug: "medicine-courier-from-ahmedabad-to-oman.htm" },
  { id: "ahmedabad-to-singapore", city: "Ahmedabad", country: "Singapore", name: "Ahmedabad to Singapore", slug: "medicine-courier-from-ahmedabad-to-singapore.htm" },
  { id: "ahmedabad-to-uae", city: "Ahmedabad", country: "UAE", name: "Ahmedabad to UAE", slug: "medicine-courier-from-ahmedabad-to-uae.htm" },
  { id: "ahmedabad-to-uk", city: "Ahmedabad", country: "UK", name: "Ahmedabad to UK", slug: "medicine-courier-from-ahmedabad-to-uk.htm" },
  { id: "ahmedabad-to-usa", city: "Ahmedabad", country: "USA", name: "Ahmedabad to USA", slug: "medicine-courier-from-ahmedabad-to-usa.htm" },
  { id: "ahmedabad-to-zambia", city: "Ahmedabad", country: "Zambia", name: "Ahmedabad to Zambia", slug: "medicine-courier-from-ahmedabad-to-zambia.htm" },
  { id: "bangalore-to-australia", city: "Bangalore", country: "Australia", name: "Bangalore to Australia", slug: "medicine-courier-from-bangalore-to-australia.htm" },
  { id: "bangalore-to-canada", city: "Bangalore", country: "Canada", name: "Bangalore to Canada", slug: "medicine-courier-from-bangalore-to-canada.htm" },
  { id: "bangalore-to-china", city: "Bangalore", country: "China", name: "Bangalore to China", slug: "medicine-courier-from-bangalore-to-china.htm" },
  { id: "bangalore-to-dubai", city: "Bangalore", country: "Dubai", name: "Bangalore to Dubai", slug: "medicine-courier-from-bangalore-to-dubai.htm" },
  { id: "bangalore-to-ghana", city: "Bangalore", country: "Ghana", name: "Bangalore to Ghana", slug: "medicine-courier-from-bangalore-to-ghana.htm" },
  { id: "bangalore-to-hong-kong", city: "Bangalore", country: "Hong Kong", name: "Bangalore to Hong Kong", slug: "medicine-courier-from-bangalore-to-hong-kong.htm" },
  { id: "bangalore-to-japan", city: "Bangalore", country: "Japan", name: "Bangalore to Japan", slug: "medicine-courier-from-bangalore-to-japan.htm" },
  { id: "bangalore-to-lebanon", city: "Bangalore", country: "Lebanon", name: "Bangalore to Lebanon", slug: "medicine-courier-from-bangalore-to-lebanon.htm" },
  { id: "bangalore-to-malaysia", city: "Bangalore", country: "Malaysia", name: "Bangalore to Malaysia", slug: "medicine-courier-from-bangalore-to-malaysia.htm" },
  { id: "bangalore-to-oman", city: "Bangalore", country: "Oman", name: "Bangalore to Oman", slug: "medicine-courier-from-bangalore-to-oman.htm" },
  { id: "bangalore-to-philippines", city: "Bangalore", country: "Philippines", name: "Bangalore to Philippines", slug: "medicine-courier-from-bangalore-to-philippines.htm" },
  { id: "bangalore-to-qatar", city: "Bangalore", country: "Qatar", name: "Bangalore to Qatar", slug: "medicine-courier-from-bangalore-to-qatar.htm" },
  { id: "bangalore-to-singapore", city: "Bangalore", country: "Singapore", name: "Bangalore to Singapore", slug: "medicine-courier-from-bangalore-to-singapore.htm" },
  { id: "bangalore-to-uae", city: "Bangalore", country: "UAE", name: "Bangalore to UAE", slug: "medicine-courier-from-bangalore-to-uae.htm" },
  { id: "bangalore-to-uk", city: "Bangalore", country: "UK", name: "Bangalore to UK", slug: "medicine-courier-from-bangalore-to-uk.htm" },
  { id: "bangalore-to-usa", city: "Bangalore", country: "USA", name: "Bangalore to USA", slug: "medicine-courier-from-bangalore-to-usa.htm" },
  { id: "bangalore-to-zambia", city: "Bangalore", country: "Zambia", name: "Bangalore to Zambia", slug: "medicine-courier-from-bangalore-to-zambia.htm" },
  { id: "chandigarh-to-australia", city: "Chandigarh", country: "Australia", name: "Chandigarh to Australia", slug: "medicine-courier-from-chandigarh-to-australia.htm" },
  { id: "chandigarh-to-canada", city: "Chandigarh", country: "Canada", name: "Chandigarh to Canada", slug: "medicine-courier-from-chandigarh-to-canada.htm" },
  { id: "chandigarh-to-china", city: "Chandigarh", country: "China", name: "Chandigarh to China", slug: "medicine-courier-from-chandigarh-to-china.htm" },
  { id: "chandigarh-to-dubai", city: "Chandigarh", country: "Dubai", name: "Chandigarh to Dubai", slug: "medicine-courier-from-chandigarh-to-dubai.htm" },
  { id: "chandigarh-to-ghana", city: "Chandigarh", country: "Ghana", name: "Chandigarh to Ghana", slug: "medicine-courier-from-chandigarh-to-ghana.htm" },
  { id: "chandigarh-to-hong-kong", city: "Chandigarh", country: "Hong Kong", name: "Chandigarh to Hong Kong", slug: "medicine-courier-from-chandigarh-to-hong-kong.htm" },
  { id: "chandigarh-to-japan", city: "Chandigarh", country: "Japan", name: "Chandigarh to Japan", slug: "medicine-courier-from-chandigarh-to-japan.htm" },
  { id: "chandigarh-to-lebanon", city: "Chandigarh", country: "Lebanon", name: "Chandigarh to Lebanon", slug: "medicine-courier-from-chandigarh-to-lebanon.htm" },
  { id: "chandigarh-to-malaysia", city: "Chandigarh", country: "Malaysia", name: "Chandigarh to Malaysia", slug: "medicine-courier-from-chandigarh-to-malaysia.htm" },
  { id: "chandigarh-to-oman", city: "Chandigarh", country: "Oman", name: "Chandigarh to Oman", slug: "medicine-courier-from-chandigarh-to-oman.htm" },
  { id: "chandigarh-to-philippines", city: "Chandigarh", country: "Philippines", name: "Chandigarh to Philippines", slug: "medicine-courier-from-chandigarh-to-philippines.htm" },
  { id: "chandigarh-to-qatar", city: "Chandigarh", country: "Qatar", name: "Chandigarh to Qatar", slug: "medicine-courier-from-chandigarh-to-qatar.htm" },
  { id: "chandigarh-to-singapore", city: "Chandigarh", country: "Singapore", name: "Chandigarh to Singapore", slug: "medicine-courier-from-chandigarh-to-singapore.htm" },
  { id: "chandigarh-to-uae", city: "Chandigarh", country: "UAE", name: "Chandigarh to UAE", slug: "medicine-courier-from-chandigarh-to-uae.htm" },
  { id: "chandigarh-to-uk", city: "Chandigarh", country: "UK", name: "Chandigarh to UK", slug: "medicine-courier-from-chandigarh-to-uk.htm" },
  { id: "chandigarh-to-usa", city: "Chandigarh", country: "USA", name: "Chandigarh to USA", slug: "medicine-courier-from-chandigarh-to-usa.htm" },
  { id: "chandigarh-to-zambia", city: "Chandigarh", country: "Zambia", name: "Chandigarh to Zambia", slug: "medicine-courier-from-chandigarh-to-zambia.htm" },
  { id: "chennai-to-australia", city: "Chennai", country: "Australia", name: "Chennai to Australia", slug: "medicine-courier-from-chennai-to-australia.htm" },
  { id: "chennai-to-canada", city: "Chennai", country: "Canada", name: "Chennai to Canada", slug: "medicine-courier-from-chennai-to-canada.htm" },
  { id: "chennai-to-china", city: "Chennai", country: "China", name: "Chennai to China", slug: "medicine-courier-from-chennai-to-china.htm" },
  { id: "chennai-to-dubai", city: "Chennai", country: "Dubai", name: "Chennai to Dubai", slug: "medicine-courier-from-chennai-to-dubai.htm" },
  { id: "chennai-to-ghana", city: "Chennai", country: "Ghana", name: "Chennai to Ghana", slug: "medicine-courier-from-chennai-to-ghana.htm" },
  { id: "chennai-to-hong-kong", city: "Chennai", country: "Hong Kong", name: "Chennai to Hong Kong", slug: "medicine-courier-from-chennai-to-hong-kong.htm" },
  { id: "chennai-to-japan", city: "Chennai", country: "Japan", name: "Chennai to Japan", slug: "medicine-courier-from-chennai-to-japan.htm" },
  { id: "chennai-to-lebanon", city: "Chennai", country: "Lebanon", name: "Chennai to Lebanon", slug: "medicine-courier-from-chennai-to-lebanon.htm" },
  { id: "chennai-to-malaysia", city: "Chennai", country: "Malaysia", name: "Chennai to Malaysia", slug: "medicine-courier-from-chennai-to-malaysia.htm" },
  { id: "chennai-to-oman", city: "Chennai", country: "Oman", name: "Chennai to Oman", slug: "medicine-courier-from-chennai-to-oman.htm" },
  { id: "chennai-to-philippines", city: "Chennai", country: "Philippines", name: "Chennai to Philippines", slug: "medicine-courier-from-chennai-to-philippines.htm" },
  { id: "chennai-to-qatar", city: "Chennai", country: "Qatar", name: "Chennai to Qatar", slug: "medicine-courier-from-chennai-to-qatar.htm" },
  { id: "chennai-to-singapore", city: "Chennai", country: "Singapore", name: "Chennai to Singapore", slug: "medicine-courier-from-chennai-to-singapore.htm" },
  { id: "chennai-to-uae", city: "Chennai", country: "UAE", name: "Chennai to UAE", slug: "medicine-courier-from-chennai-to-uae.htm" },
  { id: "chennai-to-uk", city: "Chennai", country: "UK", name: "Chennai to UK", slug: "medicine-courier-from-chennai-to-uk.htm" },
  { id: "chennai-to-usa", city: "Chennai", country: "USA", name: "Chennai to USA", slug: "medicine-courier-from-chennai-to-usa.htm" },
  { id: "chennai-to-zambia", city: "Chennai", country: "Zambia", name: "Chennai to Zambia", slug: "medicine-courier-from-chennai-to-zambia.htm" },
  { id: "delhi-to-australia", city: "Delhi", country: "Australia", name: "Delhi to Australia", slug: "medicine-courier-from-delhi-to-australia.htm" },
  { id: "delhi-to-canada", city: "Delhi", country: "Canada", name: "Delhi to Canada", slug: "medicine-courier-from-delhi-to-canada.htm" },
  { id: "delhi-to-china", city: "Delhi", country: "China", name: "Delhi to China", slug: "medicine-courier-from-delhi-to-china.htm" },
  { id: "delhi-to-dubai", city: "Delhi", country: "Dubai", name: "Delhi to Dubai", slug: "medicine-courier-from-delhi-to-dubai.htm" },
  { id: "delhi-to-ghana", city: "Delhi", country: "Ghana", name: "Delhi to Ghana", slug: "medicine-courier-from-delhi-to-ghana.htm" },
  { id: "delhi-to-hong-kong", city: "Delhi", country: "Hong Kong", name: "Delhi to Hong Kong", slug: "medicine-courier-from-delhi-to-hong-kong.htm" },
  { id: "delhi-to-japan", city: "Delhi", country: "Japan", name: "Delhi to Japan", slug: "medicine-courier-from-delhi-to-japan.htm" },
  { id: "delhi-to-lebanon", city: "Delhi", country: "Lebanon", name: "Delhi to Lebanon", slug: "medicine-courier-from-delhi-to-lebanon.htm" },
  { id: "delhi-to-malaysia", city: "Delhi", country: "Malaysia", name: "Delhi to Malaysia", slug: "medicine-courier-from-delhi-to-malaysia.htm" },
  { id: "delhi-to-oman", city: "Delhi", country: "Oman", name: "Delhi to Oman", slug: "medicine-courier-from-delhi-to-oman.htm" },
  { id: "delhi-to-philippines", city: "Delhi", country: "Philippines", name: "Delhi to Philippines", slug: "medicine-courier-from-delhi-to-philippines.htm" },
  { id: "delhi-to-qatar", city: "Delhi", country: "Qatar", name: "Delhi to Qatar", slug: "medicine-courier-from-delhi-to-qatar.htm" },
  { id: "delhi-to-singapore", city: "Delhi", country: "Singapore", name: "Delhi to Singapore", slug: "medicine-courier-from-delhi-to-singapore.htm" },
  { id: "delhi-to-uae", city: "Delhi", country: "UAE", name: "Delhi to UAE", slug: "medicine-courier-from-delhi-to-uae.htm" },
  { id: "delhi-to-uk", city: "Delhi", country: "UK", name: "Delhi to UK", slug: "medicine-courier-from-delhi-to-uk.htm" },
  { id: "delhi-to-usa", city: "Delhi", country: "USA", name: "Delhi to USA", slug: "medicine-courier-from-delhi-to-usa.htm" },
  { id: "delhi-to-zambia", city: "Delhi", country: "Zambia", name: "Delhi to Zambia", slug: "medicine-courier-from-delhi-to-zambia.htm" },
  { id: "gurgaon-to-australia", city: "Gurgaon", country: "Australia", name: "Gurgaon to Australia", slug: "medicine-courier-from-gurgaon-to-australia.htm" },
  { id: "gurgaon-to-canada", city: "Gurgaon", country: "Canada", name: "Gurgaon to Canada", slug: "medicine-courier-from-gurgaon-to-canada.htm" },
  { id: "gurgaon-to-china", city: "Gurgaon", country: "China", name: "Gurgaon to China", slug: "medicine-courier-from-gurgaon-to-china.htm" },
  { id: "gurgaon-to-dubai", city: "Gurgaon", country: "Dubai", name: "Gurgaon to Dubai", slug: "medicine-courier-from-gurgaon-to-dubai.htm" },
  { id: "gurgaon-to-ghana", city: "Gurgaon", country: "Ghana", name: "Gurgaon to Ghana", slug: "medicine-courier-from-gurgaon-to-ghana.htm" },
  { id: "gurgaon-to-hong-kong", city: "Gurgaon", country: "Hong Kong", name: "Gurgaon to Hong Kong", slug: "medicine-courier-from-gurgaon-to-hong-kong.htm" },
  { id: "gurgaon-to-japan", city: "Gurgaon", country: "Japan", name: "Gurgaon to Japan", slug: "medicine-courier-from-gurgaon-to-japan.htm" },
  { id: "gurgaon-to-lebanon", city: "Gurgaon", country: "Lebanon", name: "Gurgaon to Lebanon", slug: "medicine-courier-from-gurgaon-to-lebanon.htm" },
  { id: "gurgaon-to-malaysia", city: "Gurgaon", country: "Malaysia", name: "Gurgaon to Malaysia", slug: "medicine-courier-from-gurgaon-to-malaysia.htm" },
  { id: "gurgaon-to-oman", city: "Gurgaon", country: "Oman", name: "Gurgaon to Oman", slug: "medicine-courier-from-gurgaon-to-oman.htm" },
  { id: "gurgaon-to-philippines", city: "Gurgaon", country: "Philippines", name: "Gurgaon to Philippines", slug: "medicine-courier-from-gurgaon-to-philippines.htm" },
  { id: "gurgaon-to-qatar", city: "Gurgaon", country: "Qatar", name: "Gurgaon to Qatar", slug: "medicine-courier-from-gurgaon-to-qatar.htm" },
  { id: "gurgaon-to-singapore", city: "Gurgaon", country: "Singapore", name: "Gurgaon to Singapore", slug: "medicine-courier-from-gurgaon-to-singapore.htm" },
  { id: "gurgaon-to-uae", city: "Gurgaon", country: "UAE", name: "Gurgaon to UAE", slug: "medicine-courier-from-gurgaon-to-uae.htm" },
  { id: "gurgaon-to-uk", city: "Gurgaon", country: "UK", name: "Gurgaon to UK", slug: "medicine-courier-from-gurgaon-to-uk.htm" },
  { id: "gurgaon-to-usa", city: "Gurgaon", country: "USA", name: "Gurgaon to USA", slug: "medicine-courier-from-gurgaon-to-usa.htm" },
  { id: "gurgaon-to-zambia", city: "Gurgaon", country: "Zambia", name: "Gurgaon to Zambia", slug: "medicine-courier-from-gurgaon-to-zambia.htm" },
  { id: "hyderabad-to-australia", city: "Hyderabad", country: "Australia", name: "Hyderabad to Australia", slug: "medicine-courier-from-hyderabad-to-australia.htm" },
  { id: "hyderabad-to-canada", city: "Hyderabad", country: "Canada", name: "Hyderabad to Canada", slug: "medicine-courier-from-hyderabad-to-canada.htm" },
  { id: "hyderabad-to-china", city: "Hyderabad", country: "China", name: "Hyderabad to China", slug: "medicine-courier-from-hyderabad-to-china.htm" },
  { id: "hyderabad-to-dubai", city: "Hyderabad", country: "Dubai", name: "Hyderabad to Dubai", slug: "medicine-courier-from-hyderabad-to-dubai.htm" },
  { id: "hyderabad-to-ghana", city: "Hyderabad", country: "Ghana", name: "Hyderabad to Ghana", slug: "medicine-courier-from-hyderabad-to-ghana.htm" },
  { id: "hyderabad-to-hong-kong", city: "Hyderabad", country: "Hong Kong", name: "Hyderabad to Hong Kong", slug: "medicine-courier-from-hyderabad-to-hong-kong.htm" },
  { id: "hyderabad-to-japan", city: "Hyderabad", country: "Japan", name: "Hyderabad to Japan", slug: "medicine-courier-from-hyderabad-to-japan.htm" },
  { id: "hyderabad-to-lebanon", city: "Hyderabad", country: "Lebanon", name: "Hyderabad to Lebanon", slug: "medicine-courier-from-hyderabad-to-lebanon.htm" },
  { id: "hyderabad-to-malaysia", city: "Hyderabad", country: "Malaysia", name: "Hyderabad to Malaysia", slug: "medicine-courier-from-hyderabad-to-malaysia.htm" },
  { id: "hyderabad-to-oman", city: "Hyderabad", country: "Oman", name: "Hyderabad to Oman", slug: "medicine-courier-from-hyderabad-to-oman.htm" },
  { id: "hyderabad-to-philippines", city: "Hyderabad", country: "Philippines", name: "Hyderabad to Philippines", slug: "medicine-courier-from-hyderabad-to-philippines.htm" },
  { id: "hyderabad-to-qatar", city: "Hyderabad", country: "Qatar", name: "Hyderabad to Qatar", slug: "medicine-courier-from-hyderabad-to-qatar.htm" },
  { id: "hyderabad-to-singapore", city: "Hyderabad", country: "Singapore", name: "Hyderabad to Singapore", slug: "medicine-courier-from-hyderabad-to-singapore.htm" },
  { id: "hyderabad-to-uae", city: "Hyderabad", country: "UAE", name: "Hyderabad to UAE", slug: "medicine-courier-from-hyderabad-to-uae.htm" },
  { id: "hyderabad-to-uk", city: "Hyderabad", country: "UK", name: "Hyderabad to UK", slug: "medicine-courier-from-hyderabad-to-uk.htm" },
  { id: "hyderabad-to-usa", city: "Hyderabad", country: "USA", name: "Hyderabad to USA", slug: "medicine-courier-from-hyderabad-to-usa.htm" },
  { id: "hyderabad-to-zambia", city: "Hyderabad", country: "Zambia", name: "Hyderabad to Zambia", slug: "medicine-courier-from-hyderabad-to-zambia.htm" },
  { id: "jammu-&-kashmir-to-australia", city: "Jammu & Kashmir", country: "Australia", name: "Jammu & Kashmir to Australia", slug: "medicine-courier-from-jammu-and-kashmir-to-australia.htm" },
  { id: "jammu-&-kashmir-to-canada", city: "Jammu & Kashmir", country: "Canada", name: "Jammu & Kashmir to Canada", slug: "medicine-courier-from-jammu-and-kashmir-to-canada.htm" },
  { id: "jammu-&-kashmir-to-china", city: "Jammu & Kashmir", country: "China", name: "Jammu & Kashmir to China", slug: "medicine-courier-from-jammu-and-kashmir-to-china.htm" },
  { id: "jammu-&-kashmir-to-dubai", city: "Jammu & Kashmir", country: "Dubai", name: "Jammu & Kashmir to Dubai", slug: "medicine-courier-from-jammu-and-kashmir-to-dubai.htm" },
  { id: "jammu-&-kashmir-to-ghana", city: "Jammu & Kashmir", country: "Ghana", name: "Jammu & Kashmir to Ghana", slug: "medicine-courier-from-jammu-and-kashmir-to-ghana.htm" },
  { id: "jammu-&-kashmir-to-hong-kong", city: "Jammu & Kashmir", country: "Hong Kong", name: "Jammu & Kashmir to Hong Kong", slug: "medicine-courier-from-jammu-and-kashmir-to-hong-kong.htm" },
  { id: "jammu-&-kashmir-to-japan", city: "Jammu & Kashmir", country: "Japan", name: "Jammu & Kashmir to Japan", slug: "medicine-courier-from-jammu-and-kashmir-to-japan.htm" },
  { id: "jammu-&-kashmir-to-lebanon", city: "Jammu & Kashmir", country: "Lebanon", name: "Jammu & Kashmir to Lebanon", slug: "medicine-courier-from-jammu-and-kashmir-to-lebanon.htm" },
  { id: "jammu-&-kashmir-to-malaysia", city: "Jammu & Kashmir", country: "Malaysia", name: "Jammu & Kashmir to Malaysia", slug: "medicine-courier-from-jammu-and-kashmir-to-malaysia.htm" },
  { id: "jammu-&-kashmir-to-oman", city: "Jammu & Kashmir", country: "Oman", name: "Jammu & Kashmir to Oman", slug: "medicine-courier-from-jammu-and-kashmir-to-oman.htm" },
  { id: "jammu-&-kashmir-to-philippines", city: "Jammu & Kashmir", country: "Philippines", name: "Jammu & Kashmir to Philippines", slug: "medicine-courier-from-jammu-and-kashmir-to-philippines.htm" },
  { id: "jammu-&-kashmir-to-qatar", city: "Jammu & Kashmir", country: "Qatar", name: "Jammu & Kashmir to Qatar", slug: "medicine-courier-from-jammu-and-kashmir-to-qatar.htm" },
  { id: "jammu-&-kashmir-to-singapore", city: "Jammu & Kashmir", country: "Singapore", name: "Jammu & Kashmir to Singapore", slug: "medicine-courier-from-jammu-and-kashmir-to-singapore.htm" },
  { id: "jammu-&-kashmir-to-uae", city: "Jammu & Kashmir", country: "UAE", name: "Jammu & Kashmir to UAE", slug: "medicine-courier-from-jammu-and-kashmir-to-uae.htm" },
  { id: "jammu-&-kashmir-to-uk", city: "Jammu & Kashmir", country: "UK", name: "Jammu & Kashmir to UK", slug: "medicine-courier-from-jammu-and-kashmir-to-uk.htm" },
  { id: "jammu-&-kashmir-to-usa", city: "Jammu & Kashmir", country: "USA", name: "Jammu & Kashmir to USA", slug: "medicine-courier-from-jammu-and-kashmir-to-usa.htm" },
  { id: "jammu-&-kashmir-to-zambia", city: "Jammu & Kashmir", country: "Zambia", name: "Jammu & Kashmir to Zambia", slug: "medicine-courier-from-jammu-and-kashmir-to-zambia.htm" },
  { id: "kerala-to-australia", city: "Kerala", country: "Australia", name: "Kerala to Australia", slug: "medicine-courier-from-kerala-to-australia.htm" },
  { id: "kerala-to-canada", city: "Kerala", country: "Canada", name: "Kerala to Canada", slug: "medicine-courier-from-kerala-to-canada.htm" },
  { id: "kerala-to-china", city: "Kerala", country: "China", name: "Kerala to China", slug: "medicine-courier-from-kerala-to-china.htm" },
  { id: "kerala-to-dubai", city: "Kerala", country: "Dubai", name: "Kerala to Dubai", slug: "medicine-courier-from-kerala-to-dubai.htm" },
  { id: "kerala-to-ghana", city: "Kerala", country: "Ghana", name: "Kerala to Ghana", slug: "medicine-courier-from-kerala-to-ghana.htm" },
  { id: "kerala-to-hong-kong", city: "Kerala", country: "Hong Kong", name: "Kerala to Hong Kong", slug: "medicine-courier-from-kerala-to-hong-kong.htm" },
  { id: "kerala-to-japan", city: "Kerala", country: "Japan", name: "Kerala to Japan", slug: "medicine-courier-from-kerala-to-japan.htm" },
  { id: "kerala-to-lebanon", city: "Kerala", country: "Lebanon", name: "Kerala to Lebanon", slug: "medicine-courier-from-kerala-to-lebanon.htm" },
  { id: "kerala-to-malaysia", city: "Kerala", country: "Malaysia", name: "Kerala to Malaysia", slug: "medicine-courier-from-kerala-to-malaysia.htm" },
  { id: "kerala-to-oman", city: "Kerala", country: "Oman", name: "Kerala to Oman", slug: "medicine-courier-from-kerala-to-oman.htm" },
  { id: "kerala-to-philippines", city: "Kerala", country: "Philippines", name: "Kerala to Philippines", slug: "medicine-courier-from-kerala-to-philippines.htm" },
  { id: "kerala-to-qatar", city: "Kerala", country: "Qatar", name: "Kerala to Qatar", slug: "medicine-courier-from-kerala-to-qatar.htm" },
  { id: "kerala-to-singapore", city: "Kerala", country: "Singapore", name: "Kerala to Singapore", slug: "medicine-courier-from-kerala-to-singapore.htm" },
  { id: "kerala-to-uae", city: "Kerala", country: "UAE", name: "Kerala to UAE", slug: "medicine-courier-from-kerala-to-uae.htm" },
  { id: "kerala-to-uk", city: "Kerala", country: "UK", name: "Kerala to UK", slug: "medicine-courier-from-kerala-to-uk.htm" },
  { id: "kerala-to-usa", city: "Kerala", country: "USA", name: "Kerala to USA", slug: "medicine-courier-from-kerala-to-usa.htm" },
  { id: "kerala-to-zambia", city: "Kerala", country: "Zambia", name: "Kerala to Zambia", slug: "medicine-courier-from-kerala-to-zambia.htm" },
  { id: "kolkata-to-australia", city: "Kolkata", country: "Australia", name: "Kolkata to Australia", slug: "medicine-courier-from-kolkata-to-australia.htm" },
  { id: "kolkata-to-canada", city: "Kolkata", country: "Canada", name: "Kolkata to Canada", slug: "medicine-courier-from-kolkata-to-canada.htm" },
  { id: "kolkata-to-china", city: "Kolkata", country: "China", name: "Kolkata to China", slug: "medicine-courier-from-kolkata-to-china.htm" },
  { id: "kolkata-to-dubai", city: "Kolkata", country: "Dubai", name: "Kolkata to Dubai", slug: "medicine-courier-from-kolkata-to-dubai.htm" },
  { id: "kolkata-to-ghana", city: "Kolkata", country: "Ghana", name: "Kolkata to Ghana", slug: "medicine-courier-from-kolkata-to-ghana.htm" },
  { id: "kolkata-to-hong-kong", city: "Kolkata", country: "Hong Kong", name: "Kolkata to Hong Kong", slug: "medicine-courier-from-kolkata-to-hong-kong.htm" },
  { id: "kolkata-to-japan", city: "Kolkata", country: "Japan", name: "Kolkata to Japan", slug: "medicine-courier-from-kolkata-to-japan.htm" },
  { id: "kolkata-to-lebanon", city: "Kolkata", country: "Lebanon", name: "Kolkata to Lebanon", slug: "medicine-courier-from-kolkata-to-lebanon.htm" },
  { id: "kolkata-to-malaysia", city: "Kolkata", country: "Malaysia", name: "Kolkata to Malaysia", slug: "medicine-courier-from-kolkata-to-malaysia.htm" },
  { id: "kolkata-to-oman", city: "Kolkata", country: "Oman", name: "Kolkata to Oman", slug: "medicine-courier-from-kolkata-to-oman.htm" },
  { id: "kolkata-to-philippines", city: "Kolkata", country: "Philippines", name: "Kolkata to Philippines", slug: "medicine-courier-from-kolkata-to-philippines.htm" },
  { id: "kolkata-to-qatar", city: "Kolkata", country: "Qatar", name: "Kolkata to Qatar", slug: "medicine-courier-from-kolkata-to-qatar.htm" },
  { id: "kolkata-to-singapore", city: "Kolkata", country: "Singapore", name: "Kolkata to Singapore", slug: "medicine-courier-from-kolkata-to-singapore.htm" },
  { id: "kolkata-to-uae", city: "Kolkata", country: "UAE", name: "Kolkata to UAE", slug: "medicine-courier-from-kolkata-to-uae.htm" },
  { id: "kolkata-to-uk", city: "Kolkata", country: "UK", name: "Kolkata to UK", slug: "medicine-courier-from-kolkata-to-uk.htm" },
  { id: "kolkata-to-usa", city: "Kolkata", country: "USA", name: "Kolkata to USA", slug: "medicine-courier-from-kolkata-to-usa.htm" },
  { id: "kolkata-to-zambia", city: "Kolkata", country: "Zambia", name: "Kolkata to Zambia", slug: "medicine-courier-from-kolkata-to-zambia.htm" },
  { id: "lucknow-to-australia", city: "Lucknow", country: "Australia", name: "Lucknow to Australia", slug: "medicine-courier-from-lucknow-to-australia.htm" },
  { id: "lucknow-to-canada", city: "Lucknow", country: "Canada", name: "Lucknow to Canada", slug: "medicine-courier-from-lucknow-to-canada.htm" },
  { id: "lucknow-to-china", city: "Lucknow", country: "China", name: "Lucknow to China", slug: "medicine-courier-from-lucknow-to-china.htm" },
  { id: "lucknow-to-dubai", city: "Lucknow", country: "Dubai", name: "Lucknow to Dubai", slug: "medicine-courier-from-lucknow-to-dubai.htm" },
  { id: "lucknow-to-ghana", city: "Lucknow", country: "Ghana", name: "Lucknow to Ghana", slug: "medicine-courier-from-lucknow-to-ghana.htm" },
  { id: "lucknow-to-hong-kong", city: "Lucknow", country: "Hong Kong", name: "Lucknow to Hong Kong", slug: "medicine-courier-from-lucknow-to-hong-kong.htm" },
  { id: "lucknow-to-japan", city: "Lucknow", country: "Japan", name: "Lucknow to Japan", slug: "medicine-courier-from-lucknow-to-japan.htm" },
  { id: "lucknow-to-lebanon", city: "Lucknow", country: "Lebanon", name: "Lucknow to Lebanon", slug: "medicine-courier-from-lucknow-to-lebanon.htm" },
  { id: "lucknow-to-malaysia", city: "Lucknow", country: "Malaysia", name: "Lucknow to Malaysia", slug: "medicine-courier-from-lucknow-to-malaysia.htm" },
  { id: "lucknow-to-oman", city: "Lucknow", country: "Oman", name: "Lucknow to Oman", slug: "medicine-courier-from-lucknow-to-oman.htm" },
  { id: "lucknow-to-philippines", city: "Lucknow", country: "Philippines", name: "Lucknow to Philippines", slug: "medicine-courier-from-lucknow-to-philippines.htm" },
  { id: "lucknow-to-qatar", city: "Lucknow", country: "Qatar", name: "Lucknow to Qatar", slug: "medicine-courier-from-lucknow-to-qatar.htm" },
  { id: "lucknow-to-singapore", city: "Lucknow", country: "Singapore", name: "Lucknow to Singapore", slug: "medicine-courier-from-lucknow-to-singapore.htm" },
  { id: "lucknow-to-uae", city: "Lucknow", country: "UAE", name: "Lucknow to UAE", slug: "medicine-courier-from-lucknow-to-uae.htm" },
  { id: "lucknow-to-uk", city: "Lucknow", country: "UK", name: "Lucknow to UK", slug: "medicine-courier-from-lucknow-to-uk.htm" },
  { id: "lucknow-to-usa", city: "Lucknow", country: "USA", name: "Lucknow to USA", slug: "medicine-courier-from-lucknow-to-usa.htm" },
  { id: "lucknow-to-zambia", city: "Lucknow", country: "Zambia", name: "Lucknow to Zambia", slug: "medicine-courier-from-lucknow-to-zambia.htm" },
  { id: "madhya-pradesh-to-australia", city: "Madhya Pradesh", country: "Australia", name: "Madhya Pradesh to Australia", slug: "medicine-courier-from-madhya-pradesh-to-australia.htm" },
  { id: "madhya-pradesh-to-canada", city: "Madhya Pradesh", country: "Canada", name: "Madhya Pradesh to Canada", slug: "medicine-courier-from-madhya-pradesh-to-canada.htm" },
  { id: "madhya-pradesh-to-china", city: "Madhya Pradesh", country: "China", name: "Madhya Pradesh to China", slug: "medicine-courier-from-madhya-pradesh-to-china.htm" },
  { id: "madhya-pradesh-to-dubai", city: "Madhya Pradesh", country: "Dubai", name: "Madhya Pradesh to Dubai", slug: "medicine-courier-from-madhya-pradesh-to-dubai.htm" },
  { id: "madhya-pradesh-to-ghana", city: "Madhya Pradesh", country: "Ghana", name: "Madhya Pradesh to Ghana", slug: "medicine-courier-from-madhya-pradesh-to-ghana.htm" },
  { id: "madhya-pradesh-to-hong-kong", city: "Madhya Pradesh", country: "Hong Kong", name: "Madhya Pradesh to Hong Kong", slug: "medicine-courier-from-madhya-pradesh-to-hong-kong.htm" },
  { id: "madhya-pradesh-to-japan", city: "Madhya Pradesh", country: "Japan", name: "Madhya Pradesh to Japan", slug: "medicine-courier-from-madhya-pradesh-to-japan.htm" },
  { id: "madhya-pradesh-to-lebanon", city: "Madhya Pradesh", country: "Lebanon", name: "Madhya Pradesh to Lebanon", slug: "medicine-courier-from-madhya-pradesh-to-lebanon.htm" },
  { id: "madhya-pradesh-to-malaysia", city: "Madhya Pradesh", country: "Malaysia", name: "Madhya Pradesh to Malaysia", slug: "medicine-courier-from-madhya-pradesh-to-malaysia.htm" },
  { id: "madhya-pradesh-to-oman", city: "Madhya Pradesh", country: "Oman", name: "Madhya Pradesh to Oman", slug: "medicine-courier-from-madhya-pradesh-to-oman.htm" },
  { id: "madhya-pradesh-to-philippines", city: "Madhya Pradesh", country: "Philippines", name: "Madhya Pradesh to Philippines", slug: "medicine-courier-from-madhya-pradesh-to-philippines.htm" },
  { id: "madhya-pradesh-to-qatar", city: "Madhya Pradesh", country: "Qatar", name: "Madhya Pradesh to Qatar", slug: "medicine-courier-from-madhya-pradesh-to-qatar.htm" },
  { id: "madhya-pradesh-to-singapore", city: "Madhya Pradesh", country: "Singapore", name: "Madhya Pradesh to Singapore", slug: "medicine-courier-from-madhya-pradesh-to-singapore.htm" },
  { id: "madhya-pradesh-to-uae", city: "Madhya Pradesh", country: "UAE", name: "Madhya Pradesh to UAE", slug: "medicine-courier-from-madhya-pradesh-to-uae.htm" },
  { id: "madhya-pradesh-to-uk", city: "Madhya Pradesh", country: "UK", name: "Madhya Pradesh to UK", slug: "medicine-courier-from-madhya-pradesh-to-uk.htm" },
  { id: "madhya-pradesh-to-usa", city: "Madhya Pradesh", country: "USA", name: "Madhya Pradesh to USA", slug: "medicine-courier-from-madhya-pradesh-to-usa.htm" },
  { id: "madhya-pradesh-to-zambia", city: "Madhya Pradesh", country: "Zambia", name: "Madhya Pradesh to Zambia", slug: "medicine-courier-from-madhya-pradesh-to-zambia.htm" },
  { id: "mumbai-to-australia", city: "Mumbai", country: "Australia", name: "Mumbai to Australia", slug: "medicine-courier-from-mumbai-to-australia.htm" },
  { id: "mumbai-to-canada", city: "Mumbai", country: "Canada", name: "Mumbai to Canada", slug: "medicine-courier-from-mumbai-to-canada.htm" },
  { id: "mumbai-to-china", city: "Mumbai", country: "China", name: "Mumbai to China", slug: "medicine-courier-from-mumbai-to-china.htm" },
  { id: "mumbai-to-dubai", city: "Mumbai", country: "Dubai", name: "Mumbai to Dubai", slug: "medicine-courier-from-mumbai-to-dubai.htm" },
  { id: "mumbai-to-ghana", city: "Mumbai", country: "Ghana", name: "Mumbai to Ghana", slug: "medicine-courier-from-mumbai-to-ghana.htm" },
  { id: "mumbai-to-hong-kong", city: "Mumbai", country: "Hong Kong", name: "Mumbai to Hong Kong", slug: "medicine-courier-from-mumbai-to-hong-kong.htm" },
  { id: "mumbai-to-japan", city: "Mumbai", country: "Japan", name: "Mumbai to Japan", slug: "medicine-courier-from-mumbai-to-japan.htm" },
  { id: "mumbai-to-lebanon", city: "Mumbai", country: "Lebanon", name: "Mumbai to Lebanon", slug: "medicine-courier-from-mumbai-to-lebanon.htm" },
  { id: "mumbai-to-malaysia", city: "Mumbai", country: "Malaysia", name: "Mumbai to Malaysia", slug: "medicine-courier-from-mumbai-to-malaysia.htm" },
  { id: "mumbai-to-oman", city: "Mumbai", country: "Oman", name: "Mumbai to Oman", slug: "medicine-courier-from-mumbai-to-oman.htm" },
  { id: "mumbai-to-philippines", city: "Mumbai", country: "Philippines", name: "Mumbai to Philippines", slug: "medicine-courier-from-mumbai-to-philippines.htm" },
  { id: "mumbai-to-qatar", city: "Mumbai", country: "Qatar", name: "Mumbai to Qatar", slug: "medicine-courier-from-mumbai-to-qatar.htm" },
  { id: "mumbai-to-singapore", city: "Mumbai", country: "Singapore", name: "Mumbai to Singapore", slug: "medicine-courier-from-mumbai-to-singapore.htm" },
  { id: "mumbai-to-uae", city: "Mumbai", country: "UAE", name: "Mumbai to UAE", slug: "medicine-courier-from-mumbai-to-uae.htm" },
  { id: "mumbai-to-uk", city: "Mumbai", country: "UK", name: "Mumbai to UK", slug: "medicine-courier-from-mumbai-to-uk.htm" },
  { id: "mumbai-to-usa", city: "Mumbai", country: "USA", name: "Mumbai to USA", slug: "medicine-courier-from-mumbai-to-usa.htm" },
  { id: "mumbai-to-zambia", city: "Mumbai", country: "Zambia", name: "Mumbai to Zambia", slug: "medicine-courier-from-mumbai-to-zambia.htm" },
  { id: "noida-to-australia", city: "Noida", country: "Australia", name: "Noida to Australia", slug: "medicine-courier-from-noida-to-australia.htm" },
  { id: "noida-to-canada", city: "Noida", country: "Canada", name: "Noida to Canada", slug: "medicine-courier-from-noida-to-canada.htm" },
  { id: "noida-to-china", city: "Noida", country: "China", name: "Noida to China", slug: "medicine-courier-from-noida-to-china.htm" },
  { id: "noida-to-dubai", city: "Noida", country: "Dubai", name: "Noida to Dubai", slug: "medicine-courier-from-noida-to-dubai.htm" },
  { id: "noida-to-ghana", city: "Noida", country: "Ghana", name: "Noida to Ghana", slug: "medicine-courier-from-noida-to-ghana.htm" },
  { id: "noida-to-hong-kong", city: "Noida", country: "Hong Kong", name: "Noida to Hong Kong", slug: "medicine-courier-from-noida-to-hong-kong.htm" },
  { id: "noida-to-japan", city: "Noida", country: "Japan", name: "Noida to Japan", slug: "medicine-courier-from-noida-to-japan.htm" },
  { id: "noida-to-lebanon", city: "Noida", country: "Lebanon", name: "Noida to Lebanon", slug: "medicine-courier-from-noida-to-lebanon.htm" },
  { id: "noida-to-malaysia", city: "Noida", country: "Malaysia", name: "Noida to Malaysia", slug: "medicine-courier-from-noida-to-malaysia.htm" },
  { id: "noida-to-oman", city: "Noida", country: "Oman", name: "Noida to Oman", slug: "medicine-courier-from-noida-to-oman.htm" },
  { id: "noida-to-philippines", city: "Noida", country: "Philippines", name: "Noida to Philippines", slug: "medicine-courier-from-noida-to-philippines.htm" },
  { id: "noida-to-qatar", city: "Noida", country: "Qatar", name: "Noida to Qatar", slug: "medicine-courier-from-noida-to-qatar.htm" },
  { id: "noida-to-singapore", city: "Noida", country: "Singapore", name: "Noida to Singapore", slug: "medicine-courier-from-noida-to-singapore.htm" },
  { id: "noida-to-uae", city: "Noida", country: "UAE", name: "Noida to UAE", slug: "medicine-courier-from-noida-to-uae.htm" },
  { id: "noida-to-uk", city: "Noida", country: "UK", name: "Noida to UK", slug: "medicine-courier-from-noida-to-uk.htm" },
  { id: "noida-to-usa", city: "Noida", country: "USA", name: "Noida to USA", slug: "medicine-courier-from-noida-to-usa.htm" },
  { id: "noida-to-zambia", city: "Noida", country: "Zambia", name: "Noida to Zambia", slug: "medicine-courier-from-noida-to-zambia.htm" },
  { id: "pune-to-australia", city: "Pune", country: "Australia", name: "Pune to Australia", slug: "medicine-courier-from-pune-to-australia.htm" },
  { id: "pune-to-canada", city: "Pune", country: "Canada", name: "Pune to Canada", slug: "medicine-courier-from-pune-to-canada.htm" },
  { id: "pune-to-china", city: "Pune", country: "China", name: "Pune to China", slug: "medicine-courier-from-pune-to-china.htm" },
  { id: "pune-to-dubai", city: "Pune", country: "Dubai", name: "Pune to Dubai", slug: "medicine-courier-from-pune-to-dubai.htm" },
  { id: "pune-to-ghana", city: "Pune", country: "Ghana", name: "Pune to Ghana", slug: "medicine-courier-from-pune-to-ghana.htm" },
  { id: "pune-to-hong-kong", city: "Pune", country: "Hong Kong", name: "Pune to Hong Kong", slug: "medicine-courier-from-pune-to-hong-kong.htm" },
  { id: "pune-to-japan", city: "Pune", country: "Japan", name: "Pune to Japan", slug: "medicine-courier-from-pune-to-japan.htm" },
  { id: "pune-to-lebanon", city: "Pune", country: "Lebanon", name: "Pune to Lebanon", slug: "medicine-courier-from-pune-to-lebanon.htm" },
  { id: "pune-to-malaysia", city: "Pune", country: "Malaysia", name: "Pune to Malaysia", slug: "medicine-courier-from-pune-to-malaysia.htm" },
  { id: "pune-to-oman", city: "Pune", country: "Oman", name: "Pune to Oman", slug: "medicine-courier-from-pune-to-oman.htm" },
  { id: "pune-to-philippines", city: "Pune", country: "Philippines", name: "Pune to Philippines", slug: "medicine-courier-from-pune-to-philippines.htm" },
  { id: "pune-to-qatar", city: "Pune", country: "Qatar", name: "Pune to Qatar", slug: "medicine-courier-from-pune-to-qatar.htm" },
  { id: "pune-to-singapore", city: "Pune", country: "Singapore", name: "Pune to Singapore", slug: "medicine-courier-from-pune-to-singapore.htm" },
  { id: "pune-to-uae", city: "Pune", country: "UAE", name: "Pune to UAE", slug: "medicine-courier-from-pune-to-uae.htm" },
  { id: "pune-to-uk", city: "Pune", country: "UK", name: "Pune to UK", slug: "medicine-courier-from-pune-to-uk.htm" },
  { id: "pune-to-usa", city: "Pune", country: "USA", name: "Pune to USA", slug: "medicine-courier-from-pune-to-usa.htm" },
  { id: "pune-to-zambia", city: "Pune", country: "Zambia", name: "Pune to Zambia", slug: "medicine-courier-from-pune-to-zambia.htm" },
  { id: "punjab-to-australia", city: "Punjab", country: "Australia", name: "Punjab to Australia", slug: "medicine-courier-from-punjab-to-australia.htm" },
  { id: "punjab-to-canada", city: "Punjab", country: "Canada", name: "Punjab to Canada", slug: "medicine-courier-from-punjab-to-canada.htm" },
  { id: "punjab-to-china", city: "Punjab", country: "China", name: "Punjab to China", slug: "medicine-courier-from-punjab-to-china.htm" },
  { id: "punjab-to-dubai", city: "Punjab", country: "Dubai", name: "Punjab to Dubai", slug: "medicine-courier-from-punjab-to-dubai.htm" },
  { id: "punjab-to-ghana", city: "Punjab", country: "Ghana", name: "Punjab to Ghana", slug: "medicine-courier-from-punjab-to-ghana.htm" },
  { id: "punjab-to-hong-kong", city: "Punjab", country: "Hong Kong", name: "Punjab to Hong Kong", slug: "medicine-courier-from-punjab-to-hong-kong.htm" },
  { id: "punjab-to-japan", city: "Punjab", country: "Japan", name: "Punjab to Japan", slug: "medicine-courier-from-punjab-to-japan.htm" },
  { id: "punjab-to-lebanon", city: "Punjab", country: "Lebanon", name: "Punjab to Lebanon", slug: "medicine-courier-from-punjab-to-lebanon.htm" },
  { id: "punjab-to-malaysia", city: "Punjab", country: "Malaysia", name: "Punjab to Malaysia", slug: "medicine-courier-from-punjab-to-malaysia.htm" },
  { id: "punjab-to-oman", city: "Punjab", country: "Oman", name: "Punjab to Oman", slug: "medicine-courier-from-punjab-to-oman.htm" },
  { id: "punjab-to-philippines", city: "Punjab", country: "Philippines", name: "Punjab to Philippines", slug: "medicine-courier-from-punjab-to-philippines.htm" },
  { id: "punjab-to-qatar", city: "Punjab", country: "Qatar", name: "Punjab to Qatar", slug: "medicine-courier-from-punjab-to-qatar.htm" },
  { id: "punjab-to-singapore", city: "Punjab", country: "Singapore", name: "Punjab to Singapore", slug: "medicine-courier-from-punjab-to-singapore.htm" },
  { id: "punjab-to-uae", city: "Punjab", country: "UAE", name: "Punjab to UAE", slug: "medicine-courier-from-punjab-to-uae.htm" },
  { id: "punjab-to-uk", city: "Punjab", country: "UK", name: "Punjab to UK", slug: "medicine-courier-from-punjab-to-uk.htm" },
  { id: "punjab-to-usa", city: "Punjab", country: "USA", name: "Punjab to USA", slug: "medicine-courier-from-punjab-to-usa.htm" },
  { id: "punjab-to-zambia", city: "Punjab", country: "Zambia", name: "Punjab to Zambia", slug: "medicine-courier-from-punjab-to-zambia.htm" },
];

