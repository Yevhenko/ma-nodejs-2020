const user = {
  firstName: 'John',
  lastName: 'Doe',
  rate: 0.86,
  address: {
    line1: '15 Macon St',
    line2: '',
    city: 'Gotham',
  },
  phoneNumbers: [
    {
      type: 'MOBILE',
      number: '(555) 555-1234',
    },
    {
      type: 'LINE',
      number: '(555) 555-5678',
    },
  ],
};

if (typeof user.firstName === 'string') {
  console.log('ok');
} else {
  console.log('not_ok');
}

if (typeof user.lastName === 'string') {
  console.log('ok');
} else {
  console.log('not_ok');
}

if (typeof user.rate === 'number' && user.rate <= 1 && user.rate >= 0) {
  console.log('ok');
} else {
  console.log('not_ok');
}

if (typeof user.address === 'object' && Object.keys(user.address).length) {
  console.log('ok');
} else {
  console.log('not_ok');
}

if (typeof user.address.line1 === 'string') {
  console.log('ok');
} else {
  console.log('not_ok');
}

if (typeof user.address.line2 === 'string') {
  console.log('ok');
} else {
  console.log('not_ok');
}

if (typeof user.address.city === 'string') {
  console.log('ok');
} else {
  console.log('not_ok');
}

if (Array.isArray(user.phoneNumbers)) {
  console.log('ok');
} else {
  console.log('not_ok');
}

user.phoneNumbers.forEach((e) => {
  if (typeof e.type === 'string' && ['MOBILE', 'LINE', 'VOIP'].includes(e.type)) {
    console.log('ok');
  } else {
    console.log('not_ok');
  }

  if (typeof e.number === 'string') {
    console.log('ok');
  } else {
    console.log('not_ok');
  }
});
