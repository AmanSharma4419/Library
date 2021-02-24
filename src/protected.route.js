import React, { } from 'react';
import { Redirect , Route } from 'react-router-dom';
//import auth from './auth';
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

const ProtectedRoute = ({component: Component, ...rest}) => {
	return (
		
	<Route 
	{...rest}
	render={
		
		(props) => {
		
		//return <Component {...props}/>;
		
		    const isAuth = localStorage.getItem('studentid');
			
			var url = (JSON.stringify(props.location.pathname));
			var urls = JSON.parse(url);
			if(isAuth)
			{
				if(urls === "/studentprofile")
				{
				return <DefaultLayout {...props}/>;  
				}
				else if(urls === "/Librarygeneral")
				{
				return <DefaultLayout {...props}/>;  
				}
				else if(urls === "/Librarygre")
				{
				return <DefaultLayout {...props}/>;  
				}
				else if(urls === "/Librarygmat")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/StaffLibraryieltss")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/Libraryvideo")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/Librarygrevid")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/Librarygmatvid")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/Libraryieltsvid")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/institutelist")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/universityabout")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/preferedpartnerlist")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/draftapplication")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/sendapplication")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/Acceptedapplication")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/sendapplicationinprocess")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/profiledashboard")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/changepassword")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/paymentDetails")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/profilenotification")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/savedsearch")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/profilewishlist")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/profilewishlistinstitute")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/inboxmail")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/sentmail")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/outboxmail")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/maildraft")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/starredmail")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/composemail")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/applications")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/composemail")
				{
				return <DefaultLayout {...props}/>;  
				}else if(urls === "/composemail")
				{
				return <DefaultLayout {...props}/>;  
				}
				else
				{
				return ( <Redirect to={{ pathname: "/", state: { from: props.location } }} /> );  
				}
			}
			else
			{
			return ( <Redirect to={{ pathname: "/", state: { from: props.location } }} /> );  
			}
			
		
		}}
		/>
	);
};

export default ProtectedRoute;