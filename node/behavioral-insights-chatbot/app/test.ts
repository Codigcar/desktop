// import { config } from 'dotenv';
// config();
// import { MetaService } from './services/meta.service';
// import { UsersModel } from './models/users.model';

// const metaService = new MetaService();

// class Test {
//   static async testSampleMessage() {
//     try {
//       const user = await UsersModel.findOne({
//         where: {
//           phone: '51946100691',
//         },
//         rejectOnEmpty: false,
//       });
//       if (user) {
//         const res = await metaService.sendMessage(
//           user,
//           'some example message',
//         );
//         console.log(res);
//       }
//     } catch (e) {
//       console.log('Error Testing', e);
//     }
//   }

//   static async testMedia(
//     link: string,
//     type: 'audio' | 'image',
//   ) {
//     try {
//       const user = await UsersModel.findOne({
//         where: {
//           phone: '51946100691',
//         },
//         rejectOnEmpty: false,
//       });
//       if (user) {
//         const res = await metaService.sendMedia(
//           user,
//           type,
//           link,
//         );
//         console.log(res);
//       }
//     } catch (e) {
//       console.log('Error Testing', e);
//     }
//   }
// }

// Test.testSampleMessage();

// // Test.testMedia(
// //   'https://upload.wikimedia.org/wikipedia/commons/b/bd/Interloper_%28ISRC_USUAN1100401%29.aac',
// //   'audio',
// // );

// //Test.testMedia('https://picsum.photos/200/300', 'image');
