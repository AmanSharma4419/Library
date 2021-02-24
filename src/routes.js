import React from "react";

const Breadcrumbs = React.lazy(() => import("./views/Base/Breadcrumbs"));
const ViewApplications = React.lazy(() =>
  import("./views/Viewapplications/Viewapplications")
);
const Cards = React.lazy(() => import("./views/Base/Cards"));
const Carousels = React.lazy(() => import("./views/Base/Carousels"));
const Collapses = React.lazy(() => import("./views/Base/Collapses"));
const Dropdowns = React.lazy(() => import("./views/Base/Dropdowns"));
const Forms = React.lazy(() => import("./views/Base/Forms"));
const Jumbotrons = React.lazy(() => import("./views/Base/Jumbotrons"));
const ListGroups = React.lazy(() => import("./views/Base/ListGroups"));
const Navbars = React.lazy(() => import("./views/Base/Navbars"));
const Navs = React.lazy(() => import("./views/Base/Navs"));
const Paginations = React.lazy(() => import("./views/Base/Paginations"));
const Popovers = React.lazy(() => import("./views/Base/Popovers"));
const ProgressBar = React.lazy(() => import("./views/Base/ProgressBar"));
const Switches = React.lazy(() => import("./views/Base/Switches"));
const Tables = React.lazy(() => import("./views/Base/Tables"));
const Tabs = React.lazy(() => import("./views/Base/Tabs"));
const Tooltips = React.lazy(() => import("./views/Base/Tooltips"));
const BrandButtons = React.lazy(() => import("./views/Buttons/BrandButtons"));
const ButtonDropdowns = React.lazy(() =>
  import("./views/Buttons/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() => import("./views/Buttons/ButtonGroups"));
const Buttons = React.lazy(() => import("./views/Buttons/Buttons"));
const Charts = React.lazy(() => import("./views/Charts"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const CoreUIIcons = React.lazy(() => import("./views/Icons/CoreUIIcons"));
const Flags = React.lazy(() => import("./views/Icons/Flags"));
const FontAwesome = React.lazy(() => import("./views/Icons/FontAwesome"));
const SimpleLineIcons = React.lazy(() =>
  import("./views/Icons/SimpleLineIcons")
);
const Alerts = React.lazy(() => import("./views/Notifications/Alerts"));
const Badges = React.lazy(() => import("./views/Notifications/Badges"));
const Modals = React.lazy(() => import("./views/Notifications/Modals"));
const Colors = React.lazy(() => import("./views/Theme/Colors"));
const Typography = React.lazy(() => import("./views/Theme/Typography"));
const Widgets = React.lazy(() => import("./views/Widgets/Widgets"));
const Users = React.lazy(() => import("./views/Users/Users"));
const User = React.lazy(() => import("./views/Users/User"));

const Applications = React.lazy(() => import("./views/Applications/Applications"));


const ProfileDashBoard = React.lazy(() => import("./views/ProfileDashBoard/ProfileDashBoard"));
const studentlibrary = React.lazy(() => import("./views/studentlibrary/studentlibrary"));
// const academicintermediate = React.lazy(() => import("./views/Academicintermediate/Academicintermediate"));
const academicbeginner = React.lazy(() => import("./views/Academicbeginner/Academicbeginner"));
const viewtutorial = React.lazy(() => import("./views/viewtutorial/viewtutorial"));
// const Exam = React.lazy(() => import("./views/Exam/Exam"));
// const Answer = React.lazy(() => import("./views/Exam/Answer"));
// const academicadvanced = React.lazy(() => import("./views/Acdemicadvanced/Acdemicadvanced"));
const Institutelist = React.lazy(() => import("./views/Institutelist/Institutelist"));
const Programlist = React.lazy(() => import("./views/Programlist/Programlist"));
const Profilewishlist = React.lazy(() => import("./views/Profilewishlist/Profilewishlist"));
const onesubscription = React.lazy(() => import("./views/onesubscription/onesubscription"));
const multisubscription = React.lazy(() => import("./views/multisubscription/multisubscription"));
const Profilewishlistinstitute = React.lazy(() =>
  import("./views/Profilewishlistinstitute/Profilewishlistinstitute")
);
const ProfilewishlistReferralPartners = React.lazy(() =>
  import(
    "./views/ProfilewishlistReferralPartners/ProfilewishlistReferralPartners"
  )
);
const Universityabout = React.lazy(() => import("./views/Universityabout/Universityabout"));
const Draftapplication = React.lazy(() => import("./views/Draftapplication/Draftapplication"));

const AgentContracts = React.lazy(() => import("./views/AgentContracts/AgentContract"));

const Acceptedapplication = React.lazy(() =>
  import("./views/Acceptedapplication/Acceptedapplication")
);
const Sendapplication = React.lazy(() => import("./views/Sendapplication/Sendapplication"));

const Sendapplicationinprocess = React.lazy(() =>
  import("./views/Sendapplicationinprocess/Sendapplicationinprocess")
);
const Sendapplicationnote = React.lazy(() =>
  import("./views/Sendapplicationnote/Sendapplicationnote")
);
const Makepayment = React.lazy(() => import("./views/Makepayment/Makepayment"));
const MakepaymentTution = React.lazy(() => import("./views/MakepaymentTution/MakepaymentTution"));

const Applicationfeedbacksent = React.lazy(() =>
  import("./views/Applicationfeedbacksent/Applicationfeedbacksent")
);
const Applicationaccept = React.lazy(() => import("./views/Applicationaccept/Applicationaccept"));
const Applicationacceptoffer = React.lazy(() =>
  import("./views/Applicationacceptoffer/Applicationacceptoffer")
);
const Applicationnote = React.lazy(() => import("./views/Applicationnote/Applicationnote"));

const Librarygre = React.lazy(() => import("./views/Librarygre/Librarygre"));
const Librarygmat = React.lazy(() => import("./views/Librarygmat/Librarygmat"));
const Libraryielts = React.lazy(() => import("./views/Libraryielts/Libraryielts"));
const Librarygrevid = React.lazy(() => import("./views/Librarygrevid/Librarygrevid"));
const Librarygmatvid = React.lazy(() => import("./views/Librarygmatvid/Librarygmatvid"));
const Libraryieltsvid = React.lazy(() => import("./views/Libraryieltsvid/Libraryieltsvid"));

const Librarygeneral = React.lazy(() => import("./views/Librarygeneral/Librarygeneral"));
const Libraryvideo = React.lazy(() => import("./views/Libraryvideo/Libraryvideo"));

// for meeting
const ViewMeeting = React.lazy(() => import("./views/MeetingForMail/ViewMeeting"));

const Paymentdetails = React.lazy(() => import("./views/Paymentdetails/Paymentdetails"));

const ComposeMail = React.lazy(() =>
  import("./views/mail/ComposMail/ComposMail")
);
const MailDraft = React.lazy(() => import("./views/mail/MailDraft/MailDraft"));
const InboxMail = React.lazy(() => import("./views/mail/InboxMail/InboxMail"));
const MailDetail = React.lazy(() =>
  import("./views/mail/MailDetail/MailDetail")
);
const OutboxMail = React.lazy(() =>
  import("./views/mail/OutboxMail/OutboxMail")
);
const SentMail = React.lazy(() => import("./views/mail/SentMail/SentMail"));
const StarredMail = React.lazy(() =>
  import("./views/mail/StarredMail/StarredMail")
);
const FComposeMail = React.lazy(() =>
  import("./views/mail/FComposMail/FComposMail")
);
const DraftComposMail = React.lazy(() =>
  import("./views/mail/DraftComposMail/DraftComposMail")
);
const Preferedpartnerlist = React.lazy(() =>
  import("./views/Preferedpartnerlist/Preferedpartnerlist")
);
const Preferedpartnerabout = React.lazy(() =>
  import("./views/Preferedpartnerabout/Preferedpartnerabout")
);

const LeaveReview = React.lazy(() => import("./views/LeaveReview/LeaveReview"));
const LeaveReviewUniversity = React.lazy(() =>
  import("./views/LeaveReviewUniversity/LeaveReviewUniversity")
);
const Exam = React.lazy(() => import("./views/Exam/Exam"));
const Answer = React.lazy(() => import("./views/Exam/Answer"));
const Question = React.lazy(() => import("./views/Exam/Question"));
const Examresult = React.lazy(() => import("./views/Exam/Examresult"));
const Examresultmultiple = React.lazy(() => import("./views/Exam/Examresultmultiple"));
const Examwrittenanswer = React.lazy(() => import("./views/Exam/Examwrittenanswer"));
const Examaudiorecording = React.lazy(() => import("./views/Exam/Examaudiorecording"));
//const Profilenotification = React.lazy(() => import('./views/Profilenotification'));
//const Profilewishlist = React.lazy(() => import('./views/Profilewishlist'));
//const Savedsearch = React.lazy(() => import('./views/Savedsearch'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

const AddViewer = React.lazy(() => import("./views/AddViewer/AddViewer"));

const routes = [
  { path: "/studentlibrary", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/viewapplications/:fromNotification/:app_id",
    name: "ViewApplications",
    component: ViewApplications,
  },
  { path: "/theme", exact: true, name: "Theme", component: Colors },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", exact: true, name: "Base", component: Cards },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/forms", name: "Forms", component: Forms },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/dropdowns", name: "Dropdowns", component: Dropdowns },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", exact: true, name: "Buttons", component: Buttons },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Button Dropdowns",
    component: ButtonDropdowns,
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons,
  },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/font-awesome", name: "Font Awesome", component: FontAwesome },
  {
    path: "/icons/simple-line-icons",
    name: "Simple Line Icons",
    component: SimpleLineIcons,
  },
  {
    path: "/notifications",
    exact: true,
    name: "Notifications",
    component: Alerts,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },

  { path: "/Applications", name: "Applications", component: Applications },

  { path: "/AddViewer", name: "AddViewer", component: AddViewer },

  {
    path: "/profiledashboard",
    name: "profiledashboard",
    component: ProfileDashBoard,
  },
  {
    path: "/onesubscription",
    name: "onesubscription",
    component: onesubscription,
  },
  {
    path: "/multisubscription",
    name: "multisubscription",
    component: multisubscription,
  },
  {
    path: "/studentlibrary",
    name: "studentlibrary",
    component: studentlibrary,
  },

  // {
  //   path: "/Academicintermediate",
  //   name: "Academicintermediate",
  //   component: academicintermediate,
  // },
  {
    path: "/Academicbeginner/:id",
    name: "Academicbeginner",
    component: academicbeginner,
  },
  {
    path: "/viewtutorial/:courseId/:tutorialId",
    name: "viewtutorial",
    component: viewtutorial,
  },
  // {
  //   path: "/Exam",
  //   name: "Exam",
  //   component: Exam,
  // },
  // {
  //   path: "/Answer",
  //   name: "Answer",
  //   component: Answer,
  // },
  // {
  //   path: "/Acdemicadvanced",
  //   name: "Acdemicadvanced",
  //   component: academicadvanced,
  // },
  {
    path: "/Exam",
    name: "Exam",
    component: Exam,
  },
  {
    path: "/Examresult",
    name: "Examresult",
    component: Examresult,
  },
  {
    path: "/Examresultmultiple",
    name: "Examresultmultiple",
    component: Examresult,
  },
  {
    path: "/Examwrittenanswer",
    name: "Examwrittenanswer",
    component: Examwrittenanswer,
  },
  {
    path: "/Examaudiorecording",
    name: "Examaudiorecording",
    component: Examaudiorecording,
  },
  {
    path: "/Answer",
    name: "Answer",
    component: Answer,
  },
  {
    path: "/Question",
    name: "Question",
    component: Question,
  },
  { path: "/institutelist", name: "Institutelist", component: Institutelist },
  { path: "/programlist", name: "Programlist", component: Programlist },
  {
    path: "/profilewishlist",
    name: "Profilewishlist",
    component: Profilewishlist,
  },
  {
    path: "/profilewishlistinstitute",
    name: "Profilewishlistinstitute",
    component: Profilewishlistinstitute,
  },
  {
    path: "/profilewishlistReferralPartners",
    name: "ProfilewishlistReferralPartners",
    component: ProfilewishlistReferralPartners,
  },
  {
    path: "/universityabout",
    name: "Universityabout",
    component: Universityabout,
  },
  {
    path: "/draftapplication",
    name: "Draftapplication",
    component: Draftapplication,
  },
  {
    path: "/agentcontracts",
    name: "AgentContracts",
    component: AgentContracts,
  },
  {
    path: "/sendapplication",
    name: "Sendapplication",
    component: Sendapplication,
  },
  {
    path: "/acceptedapplication",
    name: "Acceptedapplication",
    component: Acceptedapplication,
  },
  {
    path: "/sendapplicationinprocess",
    name: "Sendapplicationinprocess",
    component: Sendapplicationinprocess,
  },
  {
    path: "/sendapplicationnote",
    name: "Sendapplicationnote",
    component: Sendapplicationnote,
  },
  { path: "/makepayment", name: "Makepayment", component: Makepayment },
  {
    path: "/makepaymentTution",
    name: "MakepaymentTution",
    component: MakepaymentTution,
  },

  {
    path: "/applicationfeedbacksent",
    name: "Applicationfeedbacksent",
    component: Applicationfeedbacksent,
  },
  {
    path: "/applicationaccept",
    name: "Applicationaccept",
    component: Applicationaccept,
  },
  {
    path: "/applicationacceptoffer",
    name: "Applicationacceptoffer",
    component: Applicationacceptoffer,
  },
  {
    path: "/Applicationnote",
    name: "Applicationnote",
    component: Applicationnote,
  },

  { path: "/Librarygre", name: "Librarygre", component: Librarygre },
  { path: "/Librarygmat", name: "Librarygmat", component: Librarygmat },
  { path: "/Libraryielts", name: "Libraryielts", component: Libraryielts },
  { path: "/Librarygrevid", name: "Librarygrevid", component: Librarygrevid },
  {
    path: "/Librarygmatvid",
    name: "Librarygmatvid",
    component: Librarygmatvid,
  },
  {
    path: "/Libraryieltsvid",
    name: "Libraryieltsvid",
    component: Libraryieltsvid,
  },
  {
    path: "/Librarygeneral",
    name: "Libraryieltsvid",
    component: Librarygeneral,
  },
  { path: "/Libraryvideo", name: "Libraryieltsvid", component: Libraryvideo },

  {
    path: "/paymentdetails",
    name: "Paymentdetails",
    component: Paymentdetails,
  },

  { path: "/composemail", name: "ComposeMail", component: ComposeMail },
  { path: "/maildraft", name: "MailDraft", component: MailDraft },
  { path: "/maildetail", name: "MailDetail", component: MailDetail },
  { path: "/inboxmail", name: "InboxMail", component: InboxMail },
  { path: "/outboxmail", name: "OutboxMail", component: OutboxMail },
  { path: "/sentmail", name: "SentMail", component: SentMail },
  { path: "/starredmail", name: "StarredMail", component: StarredMail },
  { path: "/recomposemail", name: "FComposeMail", component: FComposeMail },
  {
    path: "/draftcomposemail",
    name: "DraftComposMail",
    component: DraftComposMail,
  },
  {
    path: "/preferedpartnerlist",
    name: "Preferedpartnerlist",
    component: Preferedpartnerlist,
  },
  {
    path: "/preferedpartnerabout",
    name: "Preferedpartnerabout",
    component: Preferedpartnerabout,
  },
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/theme", exact: true, name: "Theme", component: Colors },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", exact: true, name: "Base", component: Cards },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/forms", name: "Forms", component: Forms },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/dropdowns", name: "Dropdowns", component: Dropdowns },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", exact: true, name: "Buttons", component: Buttons },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Button Dropdowns",
    component: ButtonDropdowns,
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons,
  },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/font-awesome", name: "Font Awesome", component: FontAwesome },
  {
    path: "/icons/simple-line-icons",
    name: "Simple Line Icons",
    component: SimpleLineIcons,
  },
  {
    path: "/notifications",
    exact: true,
    name: "Notifications",
    component: Alerts,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },

  { path: "/Applications", name: "Applications", component: Applications },

  {
    path: "/profiledashboard",
    name: "profiledashboard",
    component: ProfileDashBoard,
  },
  { path: "/institutelist", name: "Institutelist", component: Institutelist },
  { path: "/programlist", name: "Programlist", component: Programlist },
  {
    path: "/profilewishlist",
    name: "Profilewishlist",
    component: Profilewishlist,
  },
  {
    path: "/profilewishlistinstitute",
    name: "Profilewishlistinstitute",
    component: Profilewishlistinstitute,
  },

  {
    path: "/universityabout",
    name: "Universityabout",
    component: Universityabout,
  },
  {
    path: "/draftapplication",
    name: "Draftapplication",
    component: Draftapplication,
  },
  {
    path: "/sendapplication",
    name: "Sendapplication",
    component: Sendapplication,
  },
  {
    path: "/sendapplicationinprocess",
    name: "Sendapplicationinprocess",
    component: Sendapplicationinprocess,
  },
  {
    path: "/sendapplicationnote",
    name: "Sendapplicationnote",
    component: Sendapplicationnote,
  },
  { path: "/makepayment", name: "Makepayment", component: Makepayment },
  {
    path: "/makepaymentTution",
    name: "MakepaymentTution",
    component: MakepaymentTution,
  },

  {
    path: "/applicationfeedbacksent",
    name: "Applicationfeedbacksent",
    component: Applicationfeedbacksent,
  },
  {
    path: "/applicationaccept",
    name: "Applicationaccept",
    component: Applicationaccept,
  },
  {
    path: "/applicationacceptoffer",
    name: "Applicationacceptoffer",
    component: Applicationacceptoffer,
  },
  {
    path: "/Applicationnote",
    name: "Applicationnote",
    component: Applicationnote,
  },

  { path: "/Librarygre", name: "Librarygre", component: Librarygre },
  { path: "/Librarygmat", name: "Librarygmat", component: Librarygmat },
  { path: "/Libraryielts", name: "Libraryielts", component: Libraryielts },
  { path: "/Librarygrevid", name: "Librarygrevid", component: Librarygrevid },
  {
    path: "/Librarygmatvid",
    name: "Librarygmatvid",
    component: Librarygmatvid,
  },
  {
    path: "/Libraryieltsvid",
    name: "Libraryieltsvid",
    component: Libraryieltsvid,
  },
  {
    path: "/Librarygeneral",
    name: "Libraryieltsvid",
    component: Librarygeneral,
  },
  { path: "/Libraryvideo", name: "Libraryieltsvid", component: Libraryvideo },

  {
    path: "/paymentdetails",
    name: "Paymentdetails",
    component: Paymentdetails,
  },

  { path: "/composemail", name: "ComposeMail", component: ComposeMail },
  { path: "/maildraft", name: "MailDraft", component: MailDraft },
  { path: "/maildetail", name: "MailDetail", component: MailDetail },
  { path: "/inboxmail", name: "InboxMail", component: InboxMail },
  { path: "/outboxmail", name: "OutboxMail", component: OutboxMail },
  { path: "/sentmail", name: "SentMail", component: SentMail },
  { path: "/starredmail", name: "StarredMail", component: StarredMail },
  { path: "/recomposemail", name: "FComposeMail", component: FComposeMail },
  {
    path: "/draftcomposemail",
    name: "DraftComposMail",
    component: DraftComposMail,
  },
  {
    path: "/preferedpartnerlist",
    name: "Preferedpartnerlist",
    component: Preferedpartnerlist,
  },
  {
    path: "/preferedpartnerabout",
    name: "Preferedpartnerabout",
    component: Preferedpartnerabout,
  },
  {
    path: "/LeaveReview",
    name: "LeaveReview",
    component: LeaveReview,
  },
  {
    path: "/LeaveReviewUniversity",
    name: "LeaveReviewUniversity",
    component: LeaveReviewUniversity,
  },

  { path: "/viewMeeting", name: "ViewMeeting", component: ViewMeeting },
];

export default routes;