const rules = {
    firstName: [{ required: true, message: 'First name is required!' }],
    lastName: [{ required: true, message: 'Last name is required!' }],
    userType: [{ required: true, message: 'Usertype is required!' }],
    City: [{ required: true, message: 'City is required!' }],
    State: [{ required: true, message: 'State is required!' }],
    emailAddress: [{ required: true, message: 'Emailaddress is required!' }]
};

export default rules;
