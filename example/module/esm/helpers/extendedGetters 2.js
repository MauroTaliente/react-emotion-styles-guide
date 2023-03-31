"use strict";
// // import {
// //   BaseGuide,
// // } from '../model';
// const theme = {
//   colors: { acent: 'blue' },
//   fonts: { main: 'lato' },
// };
// const state = {
//   tags: { small: true },
// };
// const guide = { theme, breakPoints: { S: 640 }, state };
// const extended = {
//   extra: <Guide extends BaseGuide>({ getThemeProp, getBreakPoint }: Getters<Guide>) => ({
//     color: getThemeProp('colors').main,
//     other: 'pink',
//     maxWidth: `${getBreakPoint('S')}px`,
//   }),
// };
// // TYPES
// type BaseGuide = {
//   breakPoints: Record<string, number>;
//   theme: { colors: Record<string, string> };
// };
// type BuidGetBreakPoints<Bps = BaseGuide['breakPoints']> = <Bp extends keyof Bps>(bp: Bp) => Bps[Bp];
// type GetThemeProp<Theme = BaseGuide['theme']> = <Key extends keyof Theme>(key: Key) => Theme[Key];
// type Getters<Guide extends BaseGuide> = {
//   getThemeProp: GetThemeProp<Guide['theme']>;
//   getBreakPoint: BuidGetBreakPoints<Guide['breakPoints']>;
// };
// // BUILD
// const buldGetGuideProps = <Guide extends BaseGuide, Prop extends keyof Guide>(prop: Guide[Prop]) => {
//   return <Key extends keyof Guide[Prop]>(key: Key): Guide[Prop][Key] => prop[key];
// };
// const buidGetters = <Guide extends BaseGuide>(guide: Guide): Getters<Guide> => ({
//   getThemeProp: buldGetGuideProps(guide.theme),
//   getBreakPoint: buldGetGuideProps(guide.breakPoints),
//   getRoot: buldGetGuideProps(guide.root),
//   getState: buldGetGuideProps(guide.state),
// });
// const builder = <Guide extends BaseGuide>(guide: Guide) => {
//   const getters = buidGetters(guide);
//   const props = extended.extra(getters);
//   return props;
// };
// // TEST AREA ~|-> |
// // const extrap = getExtendedProp();
// const final = builder(guide);
// console.log(final);
//# sourceMappingURL=extendedGetters%202.js.map