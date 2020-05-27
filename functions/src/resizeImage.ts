// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
// import * as Storage from '@google-cloud/storage';
// import * as sharp from '@types/sharp';
// import * as path from 'path';
// import * as os from 'os';

// const THUMB_MAX_WIDTH = 200;
// const THUMB_MAX_HEIGHT = 200;

// const THUMB_PREFIX = 'thumb_';

// // 初期設定
// admin.initializeApp(functions.config().firebase);
// const firestore = admin.firestore();

// // sharpで最大幅のみを指定してリサイズ
// const resizeImage = (tmpFilePath: string, destFilePath: string, width: number, height: number): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     sharp(tmpFilePath)
//       .resize(width, height)
//       .toFile(destFilePath, (err, _) => {
//         if (!err) {
//           resolve();
//         } else {
//           reject(err);
//         }
//       });
//   });
// };

// // 画像のリサイズ処理
// export const thumbnailImage = functions.storage.object().onFinalize((object) => {
//   // ファイルパスの取得
//   const filePath = object.name;
//   // ContentTypeの取得
//   const contentType = object.contentType;
//   // ディレクトを取得
//   const fileDir = path.dirname(filePath);
//   // ファイル名を取得する
//   const fileName = path.basename(filePath);

//   // 画像以外だったらなにもしない
//   if (!contentType.startsWith('image/')) {
//     console.log("これは画像ではありません");
//     return;
//   }

//   // すでにリサイズ済みだったら何もしない
//   if (fileName.startsWith(THUMB_PREFIX)) {
//     console.log("すでにリサイズ済みです");
//     return;
//   }

//   const storage = new Storage();
//   const bucket = storage.bucket(object.bucket);
//   const file = bucket.file(filePath);
//   const metadata = { contentType: contentType };

//   // 一時ディレクトリ
//   const tempLocalFile = path.join(os.tmpdir(), filePath.split('/').pop());
//   // リサイズ後の一時ファイル場所
//   const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
//   const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath.split('/').pop());

//   (async () => {
//     console.log("一時ローカルファイルは：" + tempLocalFile);
//     console.log("ディレクトリは" + fileDir);
//     // // 一時ディレクトに保存する
//     await file.download({destination: tempLocalFile});
//     console.log("一時リサイズファイルは：" + tempLocalThumbFile);
//     // 画像をリサイズする
//     await resizeImage(tempLocalFile, tempLocalThumbFile, THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT);
//     console.log("保存先のバケットは" + path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
//     // リサイズされたサムネイルをバケットにアップロード
//     await bucket.upload(tempLocalThumbFile, { destination: path.join(fileDir, `${THUMB_PREFIX}${fileName}`), metadata: metadata });
//   })()
//   .then(() => console.log("リサイズに成功しました"))
//   .catch(err => console.log("エラーが発生しました" + err));

// });