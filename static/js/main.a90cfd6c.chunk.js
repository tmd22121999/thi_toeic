(this.webpackJsonpreact=this.webpackJsonpreact||[]).push([[0],{105:function(e,n,t){},106:function(e,n,t){},107:function(e,n,t){},109:function(e,n,t){},110:function(e,n,t){"use strict";t.r(n);var i=t(0),c=t.n(i),a=t(13),r=t.n(a),o=(t(89),t(90),t(28)),s=t(157),l=t(70),h=t.n(l),d=t(39),j=t(144),b=t(146),u=t(148),m=t(149),p=t(150),g=t(75),x=t.n(g),O=t(159),f=t(155),v=t(1),w=Object(j.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}})),N=function(e){var n=w(),t=c.a.useState(null),i=Object(o.a)(t,2),a=i[0],r=i[1],s=Boolean(a),l=function(){r(null)};return Object(v.jsx)("header",{children:Object(v.jsx)("div",{className:n.root,children:Object(v.jsx)(b.a,{position:"static",children:Object(v.jsxs)(u.a,{children:[Object(v.jsx)("div",{className:"btn-toggle ".concat(n.menuButton),onClick:function(){return e.handleToggleSidebar(!0)},children:Object(v.jsx)(d.a,{})}),Object(v.jsx)(m.a,{variant:"h4",className:n.title,children:e.title||"Thi th\u1eed Toeic"}),Object(v.jsxs)("div",{children:[Object(v.jsx)(p.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){r(e.currentTarget)},color:"inherit",children:Object(v.jsx)(x.a,{})}),Object(v.jsxs)(f.a,{id:"menu-appbar",anchorEl:a,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},open:s,onClose:l,children:[Object(v.jsx)(O.a,{onClick:l,children:"Profile"}),Object(v.jsx)(O.a,{onClick:l,children:"My account"})]})]})]})})})})},y=t(151),T=t(32),C=t(30),S=(t(99),t(15)),A=function(e){var n=e.rtl,t=e.toggled,i=e.handleToggleSidebar,c=e.handleCollapseSidebar,a=e.collapse;Object(y.a)(),Object(S.f)(),Object(S.g)();return Object(v.jsxs)(C.c,{rtl:n,toggled:t,breakPoint:"md",collapsed:t?!t:a,onToggle:i,children:[Object(v.jsx)(C.f,{children:Object(v.jsx)("div",{className:"sidebar-header",children:t||Object(v.jsx)("button",{onClick:function(){return c(!a)},children:a?"M\u1edf r\u1ed9ng":"Thu nh\u1ecf"})})}),Object(v.jsx)(C.d,{children:Object(v.jsxs)(C.a,{iconShape:"circle",children:[Object(v.jsx)(C.b,{icon:Object(v.jsx)(d.c,{}),children:Object(v.jsx)(T.b,{exact:!0,to:"/",children:"Home"})}),Object(v.jsx)(C.b,{icon:Object(v.jsx)(d.b,{}),children:Object(v.jsx)(T.b,{exact:!0,to:"/Information",children:"Th\xf4ng tin v\u1ec1 b\xe0i thi Toeic"})}),Object(v.jsx)(C.b,{icon:Object(v.jsx)(d.b,{}),children:Object(v.jsx)(T.b,{exact:!0,to:"/Summary",children:"\xd4n t\u1eadp ki\u1ebfn th\u1ee9c"})}),Object(v.jsx)(C.b,{icon:Object(v.jsx)(d.b,{}),children:Object(v.jsx)(T.b,{exact:!0,to:"/Exam",children:"Thi th\u1eed Toeic"})})]})}),Object(v.jsx)(C.e,{style:{textAlign:"center"}})]})};var q=function(e){var n=Object(i.useState)(!1),t=Object(o.a)(n,2),a=t[0],r=(t[1],Object(i.useState)(!1)),s=Object(o.a)(r,2),l=s[0],h=s[1],d=c.a.useState(!1),j=Object(o.a)(d,2),b=j[0],u=j[1],m=(Object(y.a)(),function(e){h(e)});return Object(v.jsxs)("div",{className:"app ".concat(a?"rtl":""," ").concat(l?"toggled":""),children:[Object(v.jsx)(A,{id:"Sidebar",rtl:a,toggled:l,collapse:b,handleToggleSidebar:m,handleCollapseSidebar:function(e){u(e)}}),Object(v.jsxs)("main",{className:"main ".concat(b?"main-collapse":"non-collapse"),children:[Object(v.jsx)(N,{title:e.title,handleToggleSidebar:m}),Object(v.jsx)("div",{className:"app-content",children:e.children})]})]})},D=function(){return Object(v.jsx)(q,{children:Object(v.jsx)("h1",{children:"About"})})};t(105);var k=function(){return Object(v.jsxs)(q,{title:"Home",children:[Object(v.jsx)("h1",{children:"About"}),Object(v.jsx)("div",{className:"Home",children:Object(v.jsxs)("div",{className:"Container",children:[Object(v.jsx)("h3",{className:"HeadingText",children:"Heading"}),Object(v.jsx)("p",{className:"DescriptionText",children:"Description"})]})})]})},H=(t(106),t(107),t(156)),L=t(152),_=t(153),P=t(76),B=t(154),I=t(158);var M=function(e){var n=e.HandleNextQuestion,t=e.DataQuestion,i=function(e){var n=e.questionID,t=e.answer,i=e.answerID;return Object(v.jsx)(H.a.Check,{type:"radio",name:"group-".concat(n),id:"answer-".concat(n,"-").concat(i),label:t})},c=function(e){var n=e.questionID,t=void 0===n?"q1":n,c=e.questionText,a=void 0===c?"":c,r=e.answer,o=void 0===r?["(A)","(B)","(C)","(D)"]:r;return Object(v.jsxs)(H.a.Group,{controlId:t,className:"mb-3",children:[Object(v.jsx)(H.a.Label,{className:"question-text",children:a}),o.map((function(e,n){return Object(v.jsx)(i,{questionID:t,answer:e,answerID:n+1},n+1)}))]},"default-radio")};return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)(L.a,{className:"quiz",children:[Object(v.jsxs)(_.a,{className:"datum",children:[t.audio?Object(v.jsx)(_.a,{className:"justify-content-md-center",children:Object(v.jsx)(P.a,{md:"auto",children:Object(v.jsx)("audio",{controls:!0,children:Object(v.jsx)("source",{src:t.audio,type:"audio/mpeg"})})})}):null,t.image?Object(v.jsx)(_.a,{className:"justify-content-md-center",children:Object(v.jsx)(P.a,{md:"auto",children:Object(v.jsx)(B.a,{width:"350",height:"300",src:t.image,alt:"Default Image"})})}):null,Object(v.jsx)(_.a,{className:"justify-content-md-center",children:Object(v.jsx)(P.a,{md:"auto",children:Object(v.jsx)("p",{dangerouslySetInnerHTML:{__html:t.paragraph},className:"paragraph"})})})]}),Object(v.jsx)(_.a,{className:"list-question",children:Object(v.jsxs)(H.a,{onSubmit:function(){event.preventDefault(),n()},children:[t.questionList.map((function(e){return Object(v.jsx)(c,{questionID:e.id,questionText:e.question,answer:e.answer},e.id)})),Object(v.jsx)(I.a,{className:"submit-button",variant:"primary",type:"submit",children:"Next"})]})})]})})};var R=function(){var e=c.a.useState(0),n=Object(o.a)(e,2),t=n[0],i=n[1],a=[{id:"topic1",audio:"https://storage.googleapis.com/estudyme/dev/2022/06/27/30449101.mp3",image:"https://storage.googleapis.com/kslearning/images/418922160-1620725865601-pic1.png",paragraph:"",questionList:[{question:"",correctAnswer:"(A)"}]},{id:"topic2",audio:"",image:"",paragraph:"",questionList:[{id:"q1",question:"The assets of Marble Faun Publishing Company ___ last quarter when one of their main local distributors went out of business.",answer:["suffer","suffers","suffering","suffered"],correctAnswer:"suffered"},{id:"q2",question:"lndie film director Luke Steele will be in London for the premiere of ___ new movie.",answer:["him","his","himself","he"],correctAnswer:"his"}]},{id:"topic3",audio:"https://storage.googleapis.com/estudyme/dev/2022/06/27/78867473.mp3",image:"",paragraph:"",questionList:[{id:"q1",question:"Who is the woman?",answer:["(A) A restaurant manager","(B) A presentation participant","(C) A workshop organizer","(D) A cook"],correctAnswer:"(D) A cook"},{id:"q2",question:"What does the woman mean when she says, \u201cI have a weekly meeting soon\u201d?",answer:["(A) She cannot talk with the man for long.","(B) She will discuss the problem soon.","(C) She will invite the man to a weekly meeting.","(D) She will participate in the workshop next Friday."],correctAnswer:"(D) She will participate in the workshop next Friday."},{id:"q3",question:"What does Kimmy additionally want?",answer:["(A) A cheaper price","(B) Additional food items","(C) Some alcohol","(D) Dinner menus"],correctAnswer:"(D) Dinner menus"}]},{id:"topic4",audio:"",image:"",paragraph:"".concat("refer to the following e-mail.\n        <br />\n        <br />\n        <b>To: </b>Vincent Silvers vsilvers@tjrprinting.com\n        <br />\n        <b>From:</b> Joseph Craig jcraig@tjrprinting.com\n        <br />\n        <b>Date:</b> June 20\n        <br />\n        <b>Subject:</b> Spelling error on Lambert posters\n        <br />\n        <br />\n        Hi Vincent,\n        <br />\n        <br />\n        It\u2019s just come to my attention that there\u2019s been a setback with the\n        Lambert project. Apparently the posters for their product launch contain\n        a (135)____.\n        <br />\n        The company name was typed incorrectly in the heading on the final\n        version. As the liaison for this client, I need you to contact Mr.\n        Lambert, notify him of the issue, and (136) ___ for the oversight.\n        <br />\n        Because we were responsible for this error, please reassure Mr. Lambert\n        that reprinting of the posters will occur at (137) ___ expense and will\n        be completed by the end of next week.\n        <br />\n        (138) ____.\n        <br />\n        <br />\n        Regards,\n        <br />\n        Joseph Craig Production Manager, TJR Printing\n      </p>"),questionList:[{id:"q1",question:"135",answer:["(A) statement","(B)correction","(C)misprint","(D)location"],correctAnswer:"(D)location"},{id:"q2",question:"136",answer:["(A) apologizing","(B)apologized","(A) apologizes","(D)apologize"],correctAnswer:"(D)apologize"}]}],r=function(){t+1!==a.length&&i(t+1)};return Object(v.jsx)(q,{children:Object(v.jsx)("div",{className:"Home",children:Object(v.jsx)("div",{className:"Container",children:a.map((function(e,n){return Object(v.jsx)("div",{className:"topic ".concat(t===n?"Active":"Inactive"),children:Object(v.jsx)(M,{DataQuestion:e,HandleNextQuestion:r})},e.id)}))})})})};t(109);var z=function(){var e={Listening:[{id:1,name:"Part 1 : M\xf4 t\u1ea3 h\xecnh \u1ea3nh",description:"T\u01b0\u01a1ng \u1ee9ng v\u1edbi m\u1ed7i b\u1ee9c \u1ea3nh, b\u1ea1n s\u1ebd \u0111\u01b0\u1ee3c nghe 04 c\xe2u m\xf4 t\u1ea3 v\u1ec1 n\xf3. Nhi\u1ec7m v\u1ee5 c\u1ee7a b\u1ea1n l\xe0 ph\u1ea3i ch\u1ecdn c\xe2u m\xf4 t\u1ea3 \u0111\xfang nh\u1ea5t cho b\u1ee9c \u1ea3nh.",count:10,bgColor:"#ed5c64"},{id:2,name:"Part 2 : H\u1ecfi v\xe0 \u0110\xe1p",description:"B\u1ea1n s\u1ebd nghe m\u1ed9t c\xe2u h\u1ecfi (ho\u1eb7c c\xe2u n\xf3i) v\xe0 03 l\u1ef1a ch\u1ecdn tr\u1ea3 l\u1eddi. Nhi\u1ec7m v\u1ee5 c\u1ee7a b\u1ea1n l\xe0 ph\u1ea3i ch\u1ecdn ra c\xe2u tr\u1ea3 l\u1eddi \u0111\xfang nh\u1ea5t trong ba \u0111\xe1p \xe1n A-B-C.",count:30,bgColor:"#f49f0a"},{id:3,name:"Part 3 : H\u1ed9i tho\u1ea1i ng\u1eafn\t",description:"B\u1ea1n s\u1ebd nghe 10 \u0111o\u1ea1n h\u1ed9i tho\u1ea1i ng\u1eafn. M\u1ed7i \u0111o\u1ea1n c\xf3 03 c\xe2u h\u1ecfi. Nhi\u1ec7m v\u1ee5 c\u1ee7a b\u1ea1n l\xe0 ch\u1ecdn ra c\xe2u tr\u1ea3 l\u1eddi \u0111\xfang nh\u1ea5t trong 04 \u0111\xe1p \xe1n c\u1ee7a \u0111\u1ec1 thi.",count:30,bgColor:"#04AA6D"},{id:4,name:"Part 4 : \u0110o\u1ea1n th\xf4ng tin ng\u1eafn",description:"B\u1ea1n s\u1ebd nghe 10 \u0111o\u1ea1n th\xf4ng tin ng\u1eafn. M\u1ed7i \u0111o\u1ea1n c\xf3 03 c\xe2u h\u1ecfi. Nhi\u1ec7m v\u1ee5 c\u1ee7a b\u1ea1n l\xe0 ch\u1ecdn ra c\xe2u tr\u1ea3 l\u1eddi \u0111\xfang nh\u1ea5t trong s\u1ed1 04 \u0111\xe1p \xe1n \u0111\u01b0\u1ee3c cung c\u1ea5p.",count:30,bgColor:"#f08700"}],Reading:[{id:5,name:"Part 5 : Ho\xe0n th\xe0nh c\xe2u",description:"B\u1ea1n c\u1ea7n ph\u1ea3i ch\u1ecdn t\u1eeb \u0111\xfang nh\u1ea5t \u0111\u1ec3 ho\xe0n th\xe0nh c\xe2u.",count:40,bgColor:"#747474"},{id:6,name:"Part 6 : Ho\xe0n Th\xe0nh \u0110o\u1ea1n V\u0103n",description:"M\u1ed7i \u0111o\u1ea1n v\u0103n c\xf3 03 ch\u1ed7 tr\u1ed1ng. B\u1ea1n ph\u1ea3i \u0111i\u1ec1n t\u1eeb th\xedch h\u1ee3p c\xf2n thi\u1ebfu v\xe0o m\u1ed7i ch\u1ed7 tr\u1ed1ng trong \u0111o\u1ea1n v\u0103n \u0111\xf3.",count:12,bgColor:"#c2c120"},{id:7,name:"Part 7.1 : \u0110\u1ecdc hi\u1ec3u \u0111o\u1ea1n \u0111\u01a1n",description:"\u0110\u1ec1 thi c\xf3 th\u1ec3 c\xf3 t\u1eeb 7-10 \u0111o\u1ea1n v\u0103n \u0111\u01a1n. H\u1ebft m\u1ed7i \u0111o\u1ea1n v\u0103n s\u1ebd c\xf3 2-5 c\xe2u h\u1ecfi.",count:28,bgColor:"#ef4a50"},{id:8,name:"Part 7.2 : \u0110\u1ecdc hi\u1ec3u \u0111o\u1ea1n k\xe9p",description:"Trong ph\u1ea7n n\xe0y s\u1ebd c\xf3 t\u1eeb 04 c\u1eb7p \u0111o\u1ea1n v\u0103n. H\u1ebft m\u1ed7i c\u1eb7p \u0111o\u1ea1n v\u0103n s\u1ebd c\xf3 5 c\xe2u h\u1ecfi.",count:20,bgColor:"#00a6a6"}]},n=function(e){var n=e.name,t=e.description;return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("b",{className:"HeadingText",children:n}),Object(v.jsx)("p",{className:"DescriptionText",children:t})]})};return Object(v.jsxs)(q,{title:"Th\xf4ng tin v\u1ec1 b\xe0i thi Toeic",children:[Object(v.jsx)("p",{children:"M\u1ed9t b\xe0i thi TOEIC \u0111\u1ea7y \u0111\u1ee7 g\u1ed3m hai ph\u1ea7n thi: Ph\u1ea7n thi Listening (nghe hi\u1ec3u) trong 45 ph\xfat v\xe0 ph\u1ea7n thi Reading (\u0111\u1ecdc hi\u1ec3u) trong 75 ph\xfat. M\u1ed7i ph\u1ea7n thi c\xf3 100 c\xe2u. T\u1ed5ng s\u1ed1 c\xe2u h\u1ecfi c\u1ee7a c\u1ea3 hai ph\u1ea7n thi l\xe0 200 c\xe2u. T\u1ed5ng th\u1eddi gian l\xe0m b\xe0i l\xe0 120 ph\xfat hay 2 ti\u1ebfng. C\u1ea5u tr\xfac v\xe0 n\u1ed9i dung chi ti\u1ebft c\u1ee7a t\u1eebng ph\u1ea7n thi nh\u01b0 sau:"}),Object(v.jsx)("div",{className:"Toeic-Struct",children:Object(v.jsxs)("div",{className:"Container",children:[Object(v.jsx)("h4",{className:"HeadingText",children:"Ph\u1ea7n A : Listening (Nghe hi\u1ec3u)"}),Object(v.jsx)("div",{className:"summary-bar-container",children:e.Listening.map((function(e){return Object(v.jsx)("div",{className:"summary-bar text-center",style:{width:"".concat(e.count,"%"),backgroundColor:"".concat(e.bgColor),maxHeight:40,overflow:"hidden"},children:e.name},e.key)}))}),e.Listening.map((function(e){return Object(v.jsx)(n,{name:e.name,description:e.description},e.id)})),Object(v.jsx)("h4",{className:"HeadingText",children:"Ph\u1ea7n B : Reading (\u0110\u1ecdc hi\u1ec3u)"}),Object(v.jsx)("div",{className:"summary-bar-container",children:e.Reading.map((function(e){return Object(v.jsx)("div",{className:"summary-bar text-center",style:{width:"".concat(e.count,"%"),backgroundColor:"".concat(e.bgColor),maxHeight:40,overflow:"hidden"},children:e.name},e.key)}))}),e.Reading.map((function(e){return Object(v.jsx)(n,{name:e.name,description:e.description},e.id)}))]})})]})};var E=function(){return Object(v.jsxs)(q,{title:"Home",children:[Object(v.jsx)("h1",{children:"About"}),Object(v.jsx)("div",{className:"Home",children:Object(v.jsxs)("div",{className:"Container",children:[Object(v.jsx)("h3",{className:"HeadingText",children:"Heading"}),Object(v.jsx)("p",{className:"DescriptionText",children:"Description"})]})})]})},F=function(){return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)(S.c,{children:[Object(v.jsx)(S.a,{exact:!0,path:"/",children:Object(v.jsx)(k,{})}),Object(v.jsx)(S.a,{exact:!0,path:"/about",children:Object(v.jsx)(D,{})}),Object(v.jsx)(S.a,{exact:!0,path:"/Home",children:Object(v.jsx)(k,{})}),Object(v.jsx)(S.a,{exact:!0,path:"/Information",children:Object(v.jsx)(z,{})}),Object(v.jsx)(S.a,{exact:!0,path:"/Summary",children:Object(v.jsx)(E,{})}),Object(v.jsx)(S.a,{exact:!0,path:"/Exam",children:Object(v.jsx)(R,{})}),Object(v.jsx)(S.a,{exact:!0,path:"/*",children:Object(v.jsx)(k,{})})]})})};var J=function(){var e=Object(i.useState)("en"),n=Object(o.a)(e,2),t=n[0],c=n[1];return Object(v.jsx)(s.a,{locale:t,messages:h.a[t],children:Object(v.jsx)(T.a,{children:Object(v.jsx)(F,{setLocale:c})})})},W=document.getElementById("root");r.a.render(Object(v.jsx)(i.StrictMode,{children:Object(v.jsx)(J,{})}),W)},70:function(e,n){e.exports={ar:{title:"\u0631\u064a\u0627\u0643\u062a \u067e\u0631\u0648 \u0633\u0627\u064a\u062f \u0628\u0627\u0631",sidebarTitle:"\u067e\u0631\u0648 \u0633\u0627\u064a\u062f \u0628\u0627\u0631",description:"\u0634\u0631\u064a\u0637 \u062c\u0627\u0646\u0628\u064a \u0645\u0639 \u0642\u0648\u0627\u0626\u0645 \u0645\u0646\u0633\u062f\u0644\u0629 \u0648\u0639\u062f\u062f \u063a\u064a\u0631 \u0645\u062d\u062f\u0648\u062f \u0645\u0646 \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0627\u0644\u0641\u0631\u0639\u064a\u0629 \u0627\u0644\u0645\u062a\u062f\u0627\u062e\u0644\u0629",dashboard:"\u0644\u0648\u062d\u0629 \u0627\u0644\u0642\u064a\u0627\u062f\u0629",components:"\u0645\u0643\u0648\u0646\u0627\u062a",dropdown:"\u0627\u0633\u0642\u0627\u0637",submenu:"\u0642\u0627\u0626\u0645\u0629 \u0641\u0631\u0639\u064a\u0629",multiLevel:"\u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0645\u0633\u062a\u0648\u064a\u0627\u062a",collapsed:"\u0627\u0646\u0637\u0648\u0649",rtl:"\u0631 \u062a \u0644",image:"\u0635\u0648\u0631\u0629 \u0627\u0644\u062e\u0644\u0641\u064a\u0629",new:"\u062c\u062f\u064a\u062f",withPrefix:"\u0645\u0639 \u0627\u0644\u0628\u0627\u062f\u0626\u0629",withSuffix:"\u0645\u0639 \u0627\u0644\u0644\u0627\u062d\u0642\u0629",viewSource:"\u0639\u0631\u0636 \u0627\u0644\u0643\u0648\u062f"},en:{title:"React Pro Sidebar",sidebarTitle:"Pro Sidebar",description:"React sidebar library with dropdown menus and unlimited number of nested submenus",dashboard:"Dashboard",components:"Components",dropdown:"Dropdown",submenu:"Submenu",multiLevel:"Multi Level",collapsed:"Collapsed",rtl:"RTL",image:"Background image",new:"NEW",withPrefix:"With Prefix",withSuffix:"With Suffix",viewSource:"View Source"}}},90:function(e,n,t){}},[[110,1,2]]]);
//# sourceMappingURL=main.a90cfd6c.chunk.js.map