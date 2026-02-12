const admin = require("firebase-admin");

const serviceAccount = require("./authentiqa-firebase-adminsdk-fbsvc-64e8f20982.json"); // <--- REPLACE THIS LINE

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function seedData() {
  console.log("Starting Firestore data seeding...");

  // --- Universities Collection ---
  const universitiesRef = db.collection("universities");
  const universitiesData = [
    {
      name: "Medtech School",
      domain: "medtech.tn",
      location: "Tunis",
      established_year: 2005,
      status: "active",
    }, // Added Medtech
    {
      name: "University of Tunis El Manar",
      domain: "utm.rnu.tn",
      location: "Tunis",
      established_year: 1987,
      status: "active",
    },
    {
      name: "University of Sfax",
      domain: "uss.rnu.tn",
      location: "Sfax",
      established_year: 1986,
      status: "active",
    },
    {
      name: "University of Carthage",
      domain: "univ-carthage.tn",
      location: "Tunis",
      established_year: 1988,
      status: "active",
    },
    {
      name: "University of Sousse",
      domain: "um.rnu.tn",
      location: "Sousse",
      established_year: 1986,
      status: "active",
    },
    {
      name: "University of Monastir",
      domain: "um.rnu.tn",
      location: "Monastir",
      established_year: 1987,
      status: "active",
    },
    {
      name: "SPIRIT School of Engineering",
      domain: "spirit.tn",
      location: "Ariana",
      established_year: 2009,
      status: "active",
    },
  ];

  // Clear existing university data before seeding to avoid duplicates if you rerun
  const existingUniversities = await universitiesRef.get();
  const deletePromises = [];
  existingUniversities.forEach((doc) => {
    deletePromises.push(universitiesRef.doc(doc.id).delete());
  });
  await Promise.all(deletePromises);
  console.log("Cleared existing university data.");

  for (const uni of universitiesData) {
    await universitiesRef.add(uni);
    console.log(`Added university: ${uni.name}`);
  }

  // --- Templates Collection ---
  const templatesRef = db.collection("templates");
  const templateTypes = [
    "Bachelor's Degree",
    "Engineering Diploma",
    "Transcript of Records",
  ]; // Translated to English
  const fontFamilies = ["Arial", "Times New Roman", "Verdana"];

  // Clear existing templates data before seeding
  const existingTemplates = await templatesRef.get();
  const deleteTemplatePromises = [];
  existingTemplates.forEach((doc) => {
    deleteTemplatePromises.push(templatesRef.doc(doc.id).delete());
  });
  await Promise.all(deleteTemplatePromises);
  console.log("Cleared existing templates data.");

  const universitiesSnapshot = await universitiesRef.get();
  for (const doc of universitiesSnapshot.docs) {
    const university = doc.data();
    for (const type of templateTypes) {
      const template = {
        university_id: doc.id,
        title: type,
        version: Math.floor(Math.random() * 5) + 1, // Random version 1-5
        font_family:
          fontFamilies[Math.floor(Math.random() * fontFamilies.length)],
        has_qr_code: Math.random() > 0.5,
        last_updated: admin.firestore.FieldValue.serverTimestamp(),
      };
      await templatesRef.add(template);
      console.log(`Added template for ${university.name}: ${type}`);
    }
  }

  // --- Fraud Cases Collection ---
  const fraudCasesRef = db.collection("fraud_cases");
  const fraudTypes = [
    "Stamp Forgery",
    "Font Mismatch",
    "Date Alteration",
    "Signature Discrepancy",
    "Grade Manipulation",
  ];
  const universityIds = universitiesSnapshot.docs.map((doc) => doc.id);

  // Clear existing fraud cases data before seeding
  const existingFraudCases = await fraudCasesRef.get();
  const deleteFraudCasePromises = [];
  existingFraudCases.forEach((doc) => {
    deleteFraudCasePromises.push(fraudCasesRef.doc(doc.id).delete());
  });
  await Promise.all(deleteFraudCasePromises);
  console.log("Cleared existing fraud cases data.");

  for (let i = 0; i < 10; i++) {
    const randomUniId =
      universityIds[Math.floor(Math.random() * universityIds.length)];
    const randomDocType =
      templateTypes[Math.floor(Math.random() * templateTypes.length)];
    const randomFraudType =
      fraudTypes[Math.floor(Math.random() * fraudTypes.length)];

    const fraudCase = {
      university_id: randomUniId,
      document_type: randomDocType,
      detection_date: admin.firestore.Timestamp.fromDate(
        new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      ), // within last year
      confidence_score: parseFloat(
        (Math.random() * (1.0 - 0.5) + 0.5).toFixed(2),
      ), // 0.5 to 1.0
      fraud_type: randomFraudType,
    };
    await fraudCasesRef.add(fraudCase);
    console.log(`Added fraud case: ${randomFraudType}`);
  }

  // --- System Stats Collection ---
  const systemStatsRef = db.collection("system_stats");
  // Clear existing system stats data before seeding
  const existingSystemStats = await systemStatsRef.get();
  const deleteSystemStatsPromises = [];
  existingSystemStats.forEach((doc) => {
    deleteSystemStatsPromises.push(systemStatsRef.doc(doc.id).delete());
  });
  await Promise.all(deleteSystemStatsPromises);
  console.log("Cleared existing system stats data.");

  await systemStatsRef.doc("global_overview").set({
    total_docs_processed: 0, // This would be updated by your app
    total_frauds_detected: 0, // This would be updated by your app
    active_institutions: universitiesData.length,
  });
  console.log("Added global_overview document.");

  console.log("Firestore data seeding complete!");
}

seedData().catch(console.error);
