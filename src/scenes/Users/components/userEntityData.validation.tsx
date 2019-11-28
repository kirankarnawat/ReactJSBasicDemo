const rules = {
    firstname: [{ required: true, message: 'First name is required' }],
    lastname: [{ required: true, message: 'Last name is required!' }],
    emailAddress: [{ required: true, message: 'Username/Email is required!' }],
    hiringDate: [{ required: true, message: 'Hiring date is required!' }],
    jobCodeId: [{ required: true, message: 'Job code is required!' }],
};

export default rules;
