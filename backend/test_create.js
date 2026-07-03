const API_URL = 'http://localhost:5000/api/strategies';

async function postData(url, data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  return { status: response.status, data: json };
}

async function runTests() {
  console.log('--- TEST 1: Valid Data ---');
  let res = await postData(API_URL, {
    strategyName: 'Test Strategy',
    serviceName: 'Test Service',
    communicationType: 'REST',
    description: 'Test description',
    owner: 'Test Owner',
  });
  console.log('Status:', res.status);
  console.log('Response:', res.data);

  console.log('\n--- TEST 2: Missing all fields ---');
  res = await postData(API_URL, {});
  console.log('Status:', res.status, res.data);

  console.log('\n--- TEST 3: Missing one field at a time ---');
  const requiredFields = ['strategyName', 'serviceName', 'communicationType', 'description', 'owner'];
  for (const field of requiredFields) {
    const payload = {
      strategyName: 'A', serviceName: 'A', communicationType: 'A', description: 'A', owner: 'A'
    };
    delete payload[field];
    res = await postData(API_URL, payload);
    console.log(`Missing ${field} -> Status:`, res.status, res.data);
  }

  console.log('\n--- TEST 4: XSS Payload ---');
  res = await postData(API_URL, {
    strategyName: '<script>alert("xss")</script>',
    serviceName: '<img src="x" onerror="alert(1)">',
    communicationType: 'REST',
    description: '<iframe src="javascript:alert(1)">',
    owner: '<b>Owner</b>',
  });
  console.log('Status:', res.status);
  console.log('Sanitized Data:', res.data);
}

runTests();
