const admin = require("firebase-admin");
const uuid = require("uuid-v4");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://society-management-syste-6584a.appspot.com/",
});

const metadata = {
  metadata: {
    firebaseStorageDownloadTokens: uuid(),
  },
  contentType: "image/png",
  cacheControl: "public, max-age=31536000",
};

const bucket = admin.storage().bucket();
const bucketUrl = `https://storage.googleapis.com/${bucket.name}/`;

// https://storage.googleapis.com/society-management-syste-6584a.appspot.com/2021-01-13t08:36:56.170z.jpg

const uploadImageToCloud = async () => {
  let path;
  try {
    path = "example.jpg";
    const res = await bucket.upload(path, {
      destination: `images/${path}`,
      gzip: true,
      metadata: metadata,
    });
  } catch (err) {
    console.log(err);
    return false;
  }

  const imageUrl = bucketUrl + path;

  // console.log({ imageUrl: imageUrl });
  return imageUrl;
};

uploadImageToCloud()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
