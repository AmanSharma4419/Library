import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

// import { renderRoutes } from 'react-router-config';
import './App.scss';


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

//forgot
const Forgot = React.lazy(() => import('./views/Pages/Forgot'));
const Reset = React.lazy(() => import('./views/Pages/Reset'));

const Librarygeneral = React.lazy(() => import("./views/Librarygeneral/Librarygeneral"));
const Librarygre = React.lazy(() => import("./views/Librarygre/Librarygre"));
const Librarygmat = React.lazy(() => import("./views/Librarygmat/Librarygmat"));
const Libraryielts = React.lazy(() => import("./views/Libraryielts/Libraryielts"));
const Libraryvideo = React.lazy(() => import("./views/Libraryvideo/Libraryvideo"));
const Librarygrevid = React.lazy(() => import("./views/Librarygrevid/Librarygrevid"));
const Librarygmatvid = React.lazy(() => import("./views/Librarygmatvid/Librarygmatvid"));
const Libraryieltsvid = React.lazy(() => import("./views/Libraryieltsvid/Libraryieltsvid"));

const Institutelist = React.lazy(() => import('./views/Institutelist/Institutelist'));
const Universityabout = React.lazy(() => import('./views/Universityabout/Universityabout'));
const Preferedpartnerlist = React.lazy(() => import("./views/Preferedpartnerlist/Preferedpartnerlist"));
const Draftapplication = React.lazy(() => import('./views/Draftapplication/Draftapplication'));
const Sendapplication = React.lazy(() => import('./views/Sendapplication/Sendapplication'));
const Acceptedapplication = React.lazy(() => import('./views/Acceptedapplication/Acceptedapplication'));
const Sendapplicationinprocess = React.lazy(() => import("./views/Sendapplicationinprocess/Sendapplicationinprocess"));
const ProfileDashBoard = React.lazy(() => import("./views/ProfileDashBoard/ProfileDashBoard"));
const Studentlibrary = React.lazy(() => import("./views/studentlibrary/studentlibrary"));
// const academicintermediate = React.lazy(() => import("./views/Academicintermediate/Academicintermediate"));
const academicbeginner = React.lazy(() => import("./views/Academicbeginner/Academicbeginner"));
const viewtutorial = React.lazy(() => import("./views/viewtutorial/viewtutorial"));
// const Exam = React.lazy(() => import("./views/Exam/Exam"));
// const Answer = React.lazy(() => import("./views/Exam/Answer"));
// const academicadvanced = React.lazy(() => import("./views/Acdemicadvanced/Acdemicadvanced"));
const Paymentdetails = React.lazy(() => import("./views/Paymentdetails/Paymentdetails"));
const onesubscription = React.lazy(() => import("./views/onesubscription/onesubscription"));
const Profilewishlist = React.lazy(() => import('./views/Profilewishlist/Profilewishlist'));
const Profilewishlistinstitute = React.lazy(() => import('./views/Profilewishlistinstitute/Profilewishlistinstitute'));
const InboxMail = React.lazy(() => import("./views/mail/InboxMail/InboxMail"));
const SentMail = React.lazy(() => import("./views/mail/SentMail/SentMail"));
const OutboxMail = React.lazy(() => import("./views/mail/OutboxMail/OutboxMail"));
const MailDraft = React.lazy(() => import("./views/mail/MailDraft/MailDraft"));
const StarredMail = React.lazy(() => import("./views/mail/StarredMail/StarredMail"));
const ComposeMail = React.lazy(() => import("./views/mail/ComposMail/ComposMail"));
const Applications = React.lazy(() => import('./views/Applications/Applications'));
const Exam = React.lazy(() => import("./views/Exam/Exam"));
const Answer = React.lazy(() => import("./views/Exam/Answer"));
const Question = React.lazy(() => import("./views/Exam/Question"));
const Examresult = React.lazy(() => import("./views/Exam/Examresult"));
const Examresultmultiple = React.lazy(() => import("./views/Exam/Examresultmultiple"));
const Examwrittenanswer = React.lazy(() => import("./views/Exam/Examwrittenanswer"));
const Examaudiorecording = React.lazy(() => import("./views/Exam/Examaudiorecording"));
class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/Academicbeginner/:id" name="Academicbeginner" render={props => <DefaultLayout {...props} />} />
            <Route exact path="/viewtutorial/:courseId/:tutorialId" name="viewtutorial" render={props => <DefaultLayout {...props} />} />
            {/* <Route exact path="/Exam" name="Exam" render={props => <Exam {...props} />} /> */}
            {/* <Route exact path="/Answer" name="Answer" render={props => <DefaultLayout {...props} />} /> */}
            {/* <Route exact path="/Academicintermediate" name="Academicintermediate" render={props => <DefaultLayout {...props} />} /> */}
            {/* <Route exact path="/Acdemicadvanced" name="Acdemicadvanced" render={props => <DefaultLayout {...props} />} /> */}
            <Route exact path="/Exam" name="Exam" render={props => <DefaultLayout {...props} />} />
            <Route exact path="/Question" name="Question" render={props => <DefaultLayout {...props} />} />
            <Route exact path="/Answer" name="Answer" render={props => <DefaultLayout {...props} />} />
            <Route exact path="/Examresult" name="Examresult" render={props => <DefaultLayout {...props} />} />
            <Route exact path="/Examresultmultiple" name="Examresultmultiple" render={props => <DefaultLayout {...props} />} />
            <Route exact path="/Examwrittenanswer" name="Examwrittenanswer" render={props => <DefaultLayout {...props} />} />
            <Route exact path="/Examaudiorecording" name="Examaudiorecording" render={props => <DefaultLayout {...props} />} />
            <Route exact path="/onesubscription" name="subscription" render={props => <DefaultLayout {...props} />} />
            <Route exact path="/multisubscription" name="multisubscription" render={props => <DefaultLayout {...props} />} />
            <Route path="/studentlibrary" name="studentlibrary" render={props => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;