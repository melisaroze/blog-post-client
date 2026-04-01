import React from 'react';

const UserContext = React.createContext({
	user: { id: null, 
	isAdmin: null },
 		 setUser: () => {},
 		 unsetUser: () => {}

});


export default UserContext;