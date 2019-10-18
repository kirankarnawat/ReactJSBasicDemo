const rules = {
  userNameOrEmailAddress: [
    {
      required: true,
      message: 'Required',
    },
  ],
  password: [{ required: true, message: 'Required' }],
};

export default rules;
