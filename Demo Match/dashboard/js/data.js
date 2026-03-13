/**
 * TenantMatch - Mock Data & API Layer
 * Provides realistic data for demo purposes
 * Easily replaceable with Supabase calls
 */

const MockData = {
  // Generate unique IDs
  generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9)
  },

  // Current timestamp
  now() {
    return new Date().toISOString()
  },

  // Users (for superadmin)
  users: [
    { id: 'u1', email: 'sarah.m@example.com', full_name: 'Sarah Mthembu', role: 'tenant', tier: 'free', status: 'active', created_at: '2026-03-10', avatar: null, phone: '0821234567' },
    { id: 'u2', email: 'james.kgosana@email.com', full_name: 'James Kgosana', role: 'landlord', tier: 'growth', status: 'active', created_at: '2026-03-08', avatar: null, phone: '0822345678' },
    { id: 'u3', email: 'priya@estateagents.co.za', full_name: 'Priya Naidoo', role: 'agent', tier: 'pro', status: 'active', created_at: '2026-03-05', avatar: null, phone: '0823456789' },
    { id: 'u4', email: 'thabo.molefe@gmail.com', full_name: 'Thabo Molefe', role: 'tenant', tier: 'free', status: 'pending', created_at: '2026-03-03', avatar: null, phone: '0824567890' },
    { id: 'u5', email: 'linda.vdm@webmail.co.za', full_name: 'Linda van der Merwe', role: 'landlord', tier: 'growth', status: 'active', created_at: '2026-03-01', avatar: null, phone: '0825678901' },
    { id: 'u6', email: 'mike.ross@lawfirm.com', full_name: 'Mike Ross', role: 'tenant', tier: 'free', status: 'active', created_at: '2026-02-28', avatar: null, phone: '0826789012' },
    { id: 'u7', email: 'jane.doe@company.com', full_name: 'Jane Doe', role: 'tenant', tier: 'free', status: 'active', created_at: '2026-02-25', avatar: null, phone: '0827890123' },
    { id: 'u8', email: 'bob.smith@business.com', full_name: 'Bob Smith', role: 'landlord', tier: 'pro', status: 'active', created_at: '2026-02-20', avatar: null, phone: '0828901234' },
    { id: 'u9', email: 'amina.patel@gmail.com', full_name: 'Amina Patel', role: 'tenant', tier: 'free', status: 'active', created_at: '2026-02-15', avatar: null, phone: '0839012345' },
    { id: 'u10', email: 'david.johnson@yahoo.com', full_name: 'David Johnson', role: 'tenant', tier: 'free', status: 'active', created_at: '2026-02-10', avatar: null, phone: '0830123456' },
    { id: 'u11', email: 'letitia.williams@gmail.com', full_name: 'Letitia Williams', role: 'tenant', tier: 'free', status: 'active', created_at: '2026-02-05', avatar: null, phone: '0831234567' },
    { id: 'u12', email: '.properties@luxury.co.za', full_name: 'Luxury Properties SA', role: 'landlord', tier: 'pro', status: 'active', created_at: '2026-01-20', avatar: null, phone: '0111234567' },
  ],

  // Properties - More Gauteng properties
  properties: [
    { id: 'p1', owner_id: 'u2', name: 'Sandton Luxury Apartments', address: '123 Main Road, Sandton', city: 'Sandton', suburb: 'Sandton CBD', postal_code: '2196', property_type: 'apartment', status: 'active', units_count: 4, description: 'Modern luxury apartments in the heart of Sandton with stunning city views.', amenities: ['Pool', 'Gym', 'Security', 'Parking'], created_at: '2026-01-15' },
    { id: 'p2', owner_id: 'u2', name: 'Rosebank Gardens', address: '45 Park Lane, Rosebank', city: 'Rosebank', suburb: 'Rosebank', postal_code: '2196', property_type: 'flat', status: 'active', units_count: 3, description: 'Charming garden apartments in trendy Rosebank.', amenities: ['Garden', 'Parking', 'Laundry'], created_at: '2026-01-20' },
    { id: 'p3', owner_id: 'u2', name: 'Hillcrest Cottage', address: '78 Hill Road, Hillcrest', city: 'Hillcrest', suburb: 'Hillcrest', postal_code: '3610', property_type: 'house', status: 'active', units_count: 1, description: 'Beautiful 3-bedroom cottage with large garden.', amenities: ['Garden', 'Garage', 'Security'], created_at: '2026-02-01' },
    { id: 'p4', owner_id: 'u5', name: 'Midrand Executive Suites', address: '100 Oak Avenue, Midrand', city: 'Midrand', suburb: 'Halfway Gardens', postal_code: '1685', property_type: 'apartment', status: 'active', units_count: 8, description: 'Executive suites perfect for professionals.', amenities: ['Pool', 'Gym', 'Concierge', 'Parking'], created_at: '2026-02-10' },
    { id: 'p5', owner_id: 'u8', name: 'Centurion Heights', address: '50 Hendrik Verwoerd Drive, Centurion', city: 'Centurion', suburb: 'Centurion CBD', postal_code: '0046', property_type: 'townhouse', status: 'active', units_count: 6, description: 'Modern townhouses in secure estate.', amenities: ['Security', 'Clubhouse', 'Parking'], created_at: '2026-02-15' },
    { id: 'p6', owner_id: 'u12', name: 'Fourways Gardens', address: '200 William Nicol Drive, Fourways', city: 'Fourways', suburb: 'Fourways', postal_code: '2191', property_type: 'house', status: 'active', units_count: 4, description: 'Luxury homes in exclusive golf estate.', amenities: ['Pool', 'Golf', 'Security', 'Garden'], created_at: '2026-02-20' },
    { id: 'p7', owner_id: 'u12', name: 'Bryanston Studios', address: '55 Rocky Street, Bryanston', city: 'Bryanston', suburb: 'Bryanston', postal_code: '2191', property_type: 'apartment', status: 'active', units_count: 12, description: 'Compact studios ideal for young professionals.', amenities: ['Parking', 'WiFi', 'Security'], created_at: '2026-02-25' },
    { id: 'p8', owner_id: 'u5', name: 'Pretoria North Flats', address: '123 Amand Street, Pretoria North', city: 'Pretoria', suburb: 'Pretoria North', suburb: 'Pretoria North', postal_code: '0116', property_type: 'flat', status: 'active', units_count: 10, description: 'Affordable flats close to universities.', amenities: ['Parking', 'Security'], created_at: '2026-03-01' },
  ],

  // Units - More variety
  units: [
    // Sandton Luxury (p1)
    { id: 'un1', property_id: 'p1', unit_number: '1A', bedrooms: 2, bathrooms: 1, sqm: 75, rent_amount: 12000, deposit_amount: 24000, status: 'occupied', features: ['Balcony', 'Kitchen'] },
    { id: 'un2', property_id: 'p1', unit_number: '1B', bedrooms: 2, bathrooms: 1, sqm: 75, rent_amount: 12500, deposit_amount: 25000, status: 'occupied', features: ['Balcony', 'Kitchen'] },
    { id: 'un3', property_id: 'p1', unit_number: '2A', bedrooms: 3, bathrooms: 2, sqm: 110, rent_amount: 15000, deposit_amount: 30000, status: 'available', features: ['Balcony', 'Kitchen', 'Scullery'] },
    { id: 'un4', property_id: 'p1', unit_number: '2B', bedrooms: 3, bathrooms: 2, sqm: 110, rent_amount: 15500, deposit_amount: 31000, status: 'occupied', features: ['Balcony', 'Kitchen', 'Scullery'] },
    // Rosebank (p2)
    { id: 'un5', property_id: 'p2', unit_number: '1', bedrooms: 1, bathrooms: 1, sqm: 55, rent_amount: 8500, deposit_amount: 17000, status: 'occupied', features: ['Garden access'] },
    { id: 'un6', property_id: 'p2', unit_number: '2', bedrooms: 2, bathrooms: 1, sqm: 80, rent_amount: 11000, deposit_amount: 22000, status: 'occupied', features: ['Balcony'] },
    { id: 'un7', property_id: 'p2', unit_number: '3', bedrooms: 2, bathrooms: 1, sqm: 80, rent_amount: 11500, deposit_amount: 23000, status: 'available', features: ['Balcony'] },
    // Hillcrest (p3)
    { id: 'un8', property_id: 'p3', unit_number: '1', bedrooms: 3, bathrooms: 2, sqm: 150, rent_amount: 18000, deposit_amount: 36000, status: 'available', features: ['Garden', 'Garage', 'Fireplace'] },
    // Midrand (p4)
    { id: 'un9', property_id: 'p4', unit_number: '101', bedrooms: 1, bathrooms: 1, sqm: 50, rent_amount: 9000, deposit_amount: 18000, status: 'occupied', features: ['Balcony', 'Kitchen'] },
    { id: 'un10', property_id: 'p4', unit_number: '102', bedrooms: 1, bathrooms: 1, sqm: 50, rent_amount: 9000, deposit_amount: 18000, status: 'available', features: ['Balcony', 'Kitchen'] },
    { id: 'un11', property_id: 'p4', unit_number: '201', bedrooms: 2, bathrooms: 1, sqm: 70, rent_amount: 12000, deposit_amount: 24000, status: 'occupied', features: ['Balcony', 'Kitchen'] },
    { id: 'un12', property_id: 'p4', unit_number: '202', bedrooms: 2, bathrooms: 1, sqm: 70, rent_amount: 12000, deposit_amount: 24000, status: 'available', features: ['Balcony', 'Kitchen'] },
    // Centurion (p5)
    { id: 'un13', property_id: 'p5', unit_number: 'A1', bedrooms: 3, bathrooms: 2, sqm: 140, rent_amount: 14500, deposit_amount: 29000, status: 'occupied', features: ['Garage', 'Garden'] },
    { id: 'un14', property_id: 'p5', unit_number: 'A2', bedrooms: 3, bathrooms: 2, sqm: 140, rent_amount: 14500, deposit_amount: 29000, status: 'available', features: ['Garage', 'Garden'] },
    // Fourways (p6)
    { id: 'un15', property_id: 'p6', unit_number: '1', bedrooms: 4, bathrooms: 3, sqm: 250, rent_amount: 35000, deposit_amount: 70000, status: 'available', features: ['Pool', 'Garden', 'Garage', 'Study'] },
    // Bryanston (p7)
    { id: 'un16', property_id: 'p7', unit_number: '101', bedrooms: 0, bathrooms: 1, sqm: 35, rent_amount: 6500, deposit_amount: 13000, status: 'available', features: ['Kitchenette'] },
    { id: 'un17', property_id: 'p7', unit_number: '102', bedrooms: 0, bathrooms: 1, sqm: 35, rent_amount: 6500, deposit_amount: 13000, status: 'occupied', features: ['Kitchenette'] },
  ],

  // Applications - More realistic
  applications: [
    { id: 'a1', tenant_id: 'u1', property_id: 'p1', unit_id: 'un2', status: 'approved', applied_at: '2026-01-01', reviewed_at: '2026-01-03', notes: 'Excellent tenant, verified documents.', employment_status: 'employed', income: 45000 },
    { id: 'a2', tenant_id: 'u6', property_id: 'p1', unit_id: 'un3', status: 'pending', applied_at: '2026-03-08', reviewed_at: null, notes: 'Awaiting review', employment_status: 'employed', income: 55000 },
    { id: 'a3', tenant_id: 'u4', property_id: 'p3', unit_id: 'un8', status: 'pending', applied_at: '2026-03-05', reviewed_at: null, notes: 'New application', employment_status: 'self-employed', income: 60000 },
    { id: 'a4', tenant_id: 'u7', property_id: 'p2', unit_id: 'un7', status: 'pending', applied_at: '2026-03-07', reviewed_at: null, notes: 'Awaiting review', employment_status: 'employed', income: 40000 },
    { id: 'a5', tenant_id: 'u1', property_id: 'p2', unit_id: 'un7', status: 'rejected', applied_at: '2026-02-15', reviewed_at: '2026-02-18', notes: 'Already has a lease', employment_status: 'employed', income: 45000 },
    { id: 'a6', tenant_id: 'u9', property_id: 'p4', unit_id: 'un10', status: 'pending', applied_at: '2026-03-10', reviewed_at: null, notes: 'Submitted today', employment_status: 'employed', income: 35000 },
    { id: 'a7', tenant_id: 'u10', property_id: 'p5', unit_id: 'un14', status: 'pending', applied_at: '2026-03-09', reviewed_at: null, notes: 'Good income', employment_status: 'employed', income: 50000 },
    { id: 'a8', tenant_id: 'u11', property_id: 'p7', unit_id: 'un16', status: 'approved', applied_at: '2026-03-01', reviewed_at: '2026-03-02', notes: 'All documents verified', employment_status: 'student', income: 15000 },
  ],

  // Documents
  documents: [
    { id: 'd1', tenant_id: 'u1', document_type: 'id', file_name: 'sa_id.pdf', status: 'verified', verified_at: '2026-01-15', created_at: '2026-01-15' },
    { id: 'd2', tenant_id: 'u1', document_type: 'payslip', file_name: 'payslip_jan.pdf', status: 'verified', verified_at: '2026-01-15', created_at: '2026-01-15' },
    { id: 'd3', tenant_id: 'u1', document_type: 'bank_statement', file_name: 'bank_stmt.pdf', status: 'verified', verified_at: '2026-01-15', created_at: '2026-01-15' },
    { id: 'd4', tenant_id: 'u1', document_type: 'previous_lease', file_name: 'prev_lease.pdf', status: 'verified', verified_at: '2026-01-15', created_at: '2026-01-15' },
    { id: 'd5', tenant_id: 'u6', document_type: 'id', file_name: 'id.pdf', status: 'pending', verified_at: null, created_at: '2026-03-01' },
  ],

  // Maintenance requests
  maintenance: [
    { id: 'm1', tenant_id: 'u1', unit_id: 'un2', property_id: 'p1', title: 'Leaking bathroom faucet', description: 'The faucet has been dripping for 2 days', issue_type: 'plumbing', urgency: 'medium', status: 'in_progress', created_at: '2026-03-08' },
    { id: 'm2', tenant_id: 'u1', unit_id: 'un2', property_id: 'p1', title: 'AC not cooling', description: 'Aircon making loud noise', issue_type: 'hvac', urgency: 'high', status: 'completed', created_at: '2026-02-20', completed_at: '2026-02-25' },
    { id: 'm3', tenant_id: 'u6', unit_id: 'un1', property_id: 'p1', title: 'Broken light fixture', description: 'Kitchen light not working', issue_type: 'electrical', urgency: 'low', status: 'open', created_at: '2026-03-10' },
  ],

  // Payments
  payments: [
    { id: 'pay1', tenant_id: 'u1', unit_id: 'un2', amount: 12500, payment_type: 'rent', status: 'paid', due_date: '2026-03-01', paid_at: '2026-03-01' },
    { id: 'pay2', tenant_id: 'u1', unit_id: 'un2', amount: 25000, payment_type: 'deposit', status: 'paid', due_date: '2026-01-01', paid_at: '2026-01-01' },
    { id: 'pay3', tenant_id: 'u6', unit_id: 'un1', amount: 12000, payment_type: 'rent', status: 'pending', due_date: '2026-03-01', paid_at: null },
    { id: 'pay4', tenant_id: 'u7', unit_id: 'un16', amount: 6500, payment_type: 'rent', status: 'paid', due_date: '2026-03-01', paid_at: '2026-03-01' },
    { id: 'pay5', tenant_id: 'u9', unit_id: 'un9', amount: 9000, payment_type: 'rent', status: 'paid', due_date: '2026-03-01', paid_at: '2026-03-01' },
    { id: 'pay6', tenant_id: 'u10', unit_id: 'un13', amount: 14500, payment_type: 'rent', status: 'pending', due_date: '2026-03-01', paid_at: null },
  ],

  // Revenue (for superadmin/landlord)
  revenue: [
    { month: 'Oct', amount: 4200 },
    { month: 'Nov', amount: 5800 },
    { month: 'Dec', amount: 4900 },
    { month: 'Jan', amount: 7200 },
    { month: 'Feb', amount: 6800 },
    { month: 'Mar', amount: 12450 },
  ],

  // Agent - Landlords (for agent dashboard)
  agentLandlords: [
    { id: 'l1', user_id: 'u2', name: 'James Kgosana', email: 'james.kgosana@email.com', phone: '0821234567', properties_count: 3, total_units: 8, commission_rate: 5 },
    { id: 'l2', user_id: 'u5', name: 'Linda van der Merwe', email: 'linda.vdm@webmail.co.za', phone: '0831234567', properties_count: 1, total_units: 8, commission_rate: 5 },
    { id: 'l3', user_id: 'u8', name: 'Bob Smith', email: 'bob.smith@business.com', phone: '0841234567', properties_count: 1, total_units: 6, commission_rate: 7 },
  ],

  // Agent - Commissions
  commissions: [
    { id: 'c1', agent_id: 'u3', landlord_id: 'l1', property_id: 'p1', unit_id: 'un1', tenant: 'Sarah Mthembu', amount: 600, status: 'paid', period: 'Feb 2026' },
    { id: 'c2', agent_id: 'u3', landlord_id: 'l1', property_id: 'p1', unit_id: 'un2', tenant: 'John Smith', amount: 625, status: 'paid', period: 'Feb 2026' },
    { id: 'c3', agent_id: 'u3', landlord_id: 'l2', property_id: 'p4', unit_id: 'un5', tenant: 'Tom Hardy', amount: 425, status: 'pending', period: 'Mar 2026' },
    { id: 'c4', agent_id: 'u3', landlord_id: 'l1', property_id: 'p2', unit_id: 'un6', tenant: 'Jane Doe', amount: 550, status: 'pending', period: 'Mar 2026' },
  ],

  // Notifications
  notifications: [
    // Landlord notifications (u2 - James Kgosana)
    { id: 'n1', user_id: 'u2', type: 'application', title: 'New Application', message: 'Mike Ross applied for Sandton Luxury 2A', read: false, created_at: '2026-03-12T09:00:00Z' },
    { id: 'n2', user_id: 'u2', type: 'application', title: 'New Application', message: 'Thabo Molefe applied for Hillcrest Cottage', read: false, created_at: '2026-03-11T14:30:00Z' },
    { id: 'n3', user_id: 'u2', type: 'payment', title: 'Payment Received', message: 'R12,500 from Sarah Mthembu - March rent', read: false, created_at: '2026-03-10T10:00:00Z' },
    { id: 'n4', user_id: 'u2', type: 'maintenance', title: 'Maintenance Request', message: 'Sarah Mthembu reported leaking faucet - Unit 1B', read: true, created_at: '2026-03-08T09:00:00Z' },
    { id: 'n5', user_id: 'u2', type: 'application', title: 'Application Approved', message: 'You approved Jane Doe for Rosebank Unit 3', read: true, created_at: '2026-03-05T16:00:00Z' },
    // Tenant notifications (u1 - Sarah Mthembu)
    { id: 'n6', user_id: 'u1', type: 'application', title: 'Application Update', message: 'Your application for Hillcrest Cottage is pending', read: false, created_at: '2026-03-11T11:00:00Z' },
    { id: 'n7', user_id: 'u1', type: 'payment', title: 'Payment Reminder', message: 'Rent due on April 1st - R12,500', read: false, created_at: '2026-03-10T08:00:00Z' },
    { id: 'n8', user_id: 'u1', type: 'maintenance', title: 'Maintenance Update', message: 'Your AC repair has been completed', read: true, created_at: '2026-02-25T14:00:00Z' },
    // Agent notifications (u3 - Priya Naidoo)
    { id: 'n9', user_id: 'u3', type: 'application', title: 'New Tenant Match', message: 'Amina Patel is looking for property in Midrand', read: false, created_at: '2026-03-12T08:00:00Z' },
    { id: 'n10', user_id: 'u3', type: 'payment', title: 'Commission Paid', message: 'R600 commission received from James Kgosana', read: true, created_at: '2026-03-01T10:00:00Z' },
  ],

  // Saved Properties (favorites)
  savedProperties: [
    { id: 'sp1', user_id: 'u1', property_id: 'p3', saved_at: '2026-03-10T10:00:00Z' },
  ],

  // Viewings (scheduled property viewings)
  viewings: [
    { id: 'v1', user_id: 'u1', property_id: 'p1', unit_id: 'un3', landlord_id: 'u2', scheduled_date: '2026-03-15', scheduled_time: '10:00', status: 'scheduled', notes: '' },
  ],

  // Leases
  leases: [
    { id: 'l1', tenant_id: 'u1', property_id: 'p1', unit_id: 'un2', landlord_id: 'u2', start_date: '2026-01-01', end_date: '2026-12-31', rent_amount: 12500, deposit_amount: 25000, status: 'active', created_at: '2026-01-01' },
  ],

  // Conversations (for messaging)
  conversations: [
    { id: 'conv1', participants: ['u1', 'u2'], property_id: 'p1', last_message: 'Hi, I have a question about the unit', last_message_at: '2026-03-12T09:30:00Z', unread_count: { u1: 0, u2: 1 } },
    { id: 'conv2', participants: ['u1', 'u3'], property_id: null, last_message: 'Thank you for your help!', last_message_at: '2026-03-11T15:00:00Z', unread_count: { u1: 0, u3: 0 } },
  ],

  // Messages
  messages: [
    { id: 'm1', conversation_id: 'conv1', sender_id: 'u1', content: 'Hi, I\'m interested in Unit 2A. Is it still available?', created_at: '2026-03-12T09:00:00Z' },
    { id: 'm2', conversation_id: 'conv1', sender_id: 'u2', content: 'Yes, it is! Would you like to schedule a viewing?', created_at: '2026-03-12T09:15:00Z' },
    { id: 'm3', conversation_id: 'conv1', sender_id: 'u1', content: 'That would be great! I\'m available this Saturday.', created_at: '2026-03-12T09:30:00Z' },
    { id: 'm4', conversation_id: 'conv2', sender_id: 'u3', content: 'Hello! I saw your profile. How can I help you today?', created_at: '2026-03-11T14:00:00Z' },
    { id: 'm5', conversation_id: 'conv2', sender_id: 'u1', content: 'Hi Priya, I need help finding a property in Sandton.', created_at: '2026-03-11T14:30:00Z' },
    { id: 'm6', conversation_id: 'conv2', sender_id: 'u3', content: 'Thank you for your help!', created_at: '2026-03-11T15:00:00Z' },
  ],

  // Invitations (for invite system)
  invitations: [
    { id: 'inv1', email: 'newtenant@example.com', role: 'tenant', invited_by: 'u2', property_id: null, status: 'pending', token: 'tok_abc123', created_at: '2026-03-10T10:00:00Z', expires_at: '2026-03-17T10:00:00Z' },
    { id: 'inv2', email: 'agent@estate.co.za', role: 'agent', invited_by: 'sa', property_id: null, status: 'accepted', token: 'tok_def456', created_at: '2026-03-05T14:00:00Z', expires_at: '2026-03-12T14:00:00Z', accepted_at: '2026-03-06T09:00:00Z' },
  ],

  // Qualification Questions (landlord-created questions for tenant applications)
  qualificationQuestions: [
    { id: 'qq1', landlord_id: 'u2', question: 'What is your current employment status?', question_type: 'single_choice', options: JSON.stringify(['Employed', 'Self-employed', 'Student', 'Unemployed']), preferred_answer: 'Employed', weight: 10, required: true, created_at: '2026-03-01' },
    { id: 'qq2', landlord_id: 'u2', question: 'What is your monthly income?', question_type: 'single_choice', options: JSON.stringify(['Under R10,000', 'R10,000 - R20,000', 'R20,000 - R40,000', 'Over R40,000']), preferred_answer: 'Over R40,000', weight: 15, required: true, created_at: '2026-03-01' },
    { id: 'qq3', landlord_id: 'u2', question: 'Do you have any pets?', question_type: 'single_choice', options: JSON.stringify(['No', 'Yes - Cats only', 'Yes - Dogs only', 'Yes - Both']), preferred_answer: 'No', weight: 5, required: false, created_at: '2026-03-01' },
    { id: 'qq4', landlord_id: 'u5', question: 'Are you a student?', question_type: 'yes_no', options: null, preferred_answer: 'No', weight: 10, required: true, created_at: '2026-03-05' },
  ],

  // Question Answers (tenant answers to qualification questions)
  questionAnswers: [
    { id: 'qa1', application_id: 'a2', question_id: 'qq1', answer: 'Employed', score: 10 },
    { id: 'qa2', application_id: 'a2', question_id: 'qq2', answer: 'R20,000 - R40,000', score: 8 },
    { id: 'qa3', application_id: 'a2', question_id: 'qq3', answer: 'No', score: 5 },
    { id: 'qa4', application_id: 'a3', question_id: 'qq1', answer: 'Self-employed', score: 8 },
    { id: 'qa5', application_id: 'a3', question_id: 'qq2', answer: 'Over R40,000', score: 15 },
    { id: 'qa6', application_id: 'a3', question_id: 'qq3', answer: 'Yes - Cats only', score: 2 },
  ],

  // Leads (for agents)
  leads: [
    { id: 'lead1', agent_id: 'u3', name: 'Emma Watson', email: 'emma.w@email.com', phone: '0821112222', source: 'website', status: 'new', notes: 'Looking for 2BR in Sandton', created_at: '2026-03-11' },
    { id: 'lead2', agent_id: 'u3', name: 'John Citizen', email: 'john.c@email.com', phone: '0823334444', source: 'referral', status: 'contacted', notes: 'Referred by James Kgosana', created_at: '2026-03-10' },
    { id: 'lead3', agent_id: 'u3', name: 'Lisa Ray', email: 'lisa.r@email.com', phone: '0825556666', source: 'facebook', status: 'qualified', notes: 'Ready to move in next month', created_at: '2026-03-08' },
  ],

  // Email Logs (for tracking sent emails)
  emailLogs: [
    { id: 'el1', to: 'newtenant@example.com', subject: 'You are invited to join TenantMatch', type: 'invitation', status: 'sent', sent_at: '2026-03-10T10:00:00Z', sender_id: 'u2' },
    { id: 'el2', to: 'sarah.m@example.com', subject: 'Application Update - Sandton Luxury', type: 'application', status: 'sent', sent_at: '2026-03-09T14:00:00Z', sender_id: 'u2' },
    { id: 'el3', to: 'tenant@email.com', subject: 'Maintenance Request Update', type: 'maintenance', status: 'failed', sent_at: '2026-03-08T09:00:00Z', sender_id: 'u2', error: 'Invalid email address' },
  ],

  // API Methods
  api: {
    // Get all users
    getUsers(filters = {}) {
      let users = [...MockData.users]
      if (filters.role) users = users.filter(u => u.role === filters.role)
      if (filters.status) users = users.filter(u => u.status === filters.status)
      return users
    },

    // Get user by ID
    getUserById(id) {
      return MockData.users.find(u => u.id === id)
    },

    // Get properties
    getProperties(filters = {}) {
      let properties = [...MockData.properties]
      if (filters.owner_id) properties = properties.filter(p => p.owner_id === filters.owner_id)
      if (filters.city) properties = properties.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()))
      return properties
    },

    // Get property by ID
    getPropertyById(id) {
      return MockData.properties.find(p => p.id === id)
    },

    // Get units
    getUnits(filters = {}) {
      let units = [...MockData.units]
      if (filters.property_id) units = units.filter(u => u.property_id === filters.property_id)
      if (filters.status) units = units.filter(u => u.status === filters.status)
      return units
    },

    // Get unit by ID
    getUnitById(id) {
      return MockData.units.find(u => u.id === id)
    },

    // Get applications
    getApplications(filters = {}) {
      let applications = [...MockData.applications]
      if (filters.tenant_id) applications = applications.filter(a => a.tenant_id === filters.tenant_id)
      if (filters.property_id) applications = applications.filter(a => a.property_id === filters.property_id)
      if (filters.status) applications = applications.filter(a => a.status === filters.status)
      return applications
    },

    // Get documents
    getDocuments(tenantId) {
      return MockData.documents.filter(d => d.tenant_id === tenantId)
    },

    // Get maintenance
    getMaintenance(filters = {}) {
      let maintenance = [...MockData.maintenance]
      if (filters.tenant_id) maintenance = maintenance.filter(m => m.tenant_id === filters.tenant_id)
      if (filters.property_id) maintenance = maintenance.filter(m => m.property_id === filters.property_id)
      if (filters.status) maintenance = maintenance.filter(m => m.status === filters.status)
      return maintenance
    },

    // Get payments
    getPayments(filters = {}) {
      let payments = [...MockData.payments]
      if (filters.tenant_id) payments = payments.filter(p => p.tenant_id === filters.tenant_id)
      if (filters.status) payments = payments.filter(p => p.status === filters.status)
      return payments
    },

    // Get stats
    getStats(role, userId = null) {
      const stats = {
        totalUsers: MockData.users.length,
        totalProperties: MockData.properties.length,
        totalUnits: MockData.units.length,
        occupiedUnits: MockData.units.filter(u => u.status === 'occupied').length,
        pendingApplications: MockData.applications.filter(a => a.status === 'pending').length,
        approvedApplications: MockData.applications.filter(a => a.status === 'approved').length,
        totalRevenue: MockData.revenue.reduce((sum, r) => sum + r.amount, 0),
        monthlyRevenue: MockData.revenue[MockData.revenue.length - 1].amount,
        openMaintenance: MockData.maintenance.filter(m => m.status === 'open' || m.status === 'in_progress').length,
        pendingPayments: MockData.payments.filter(p => p.status === 'pending').length,
      }

      if (role === 'landlord' && userId) {
        const properties = MockData.properties.filter(p => p.owner_id === userId)
        const propertyIds = properties.map(p => p.id)
        const units = MockData.units.filter(u => propertyIds.includes(u.property_id))
        
        stats.totalProperties = properties.length
        stats.totalUnits = units.length
        stats.occupiedUnits = units.filter(u => u.status === 'occupied').length
        stats.totalRevenue = units
          .filter(u => u.status === 'occupied')
          .reduce((sum, u) => sum + u.rent_amount, 0)
      }

      return stats
    },

    // Get notifications
    getNotifications(userId) {
      return MockData.notifications.filter(n => n.user_id === userId)
    },

    // Update application status
    updateApplication(id, status) {
      const app = MockData.applications.find(a => a.id === id)
      if (app) {
        app.status = status
        app.reviewed_at = new Date().toISOString()
      }
      return app
    },

    // Create new user
    createUser(userData) {
      const newUser = {
        id: MockData.generateId(),
        ...userData,
        status: 'active',
        created_at: new Date().toISOString()
      }
      MockData.users.push(newUser)
      return newUser
    },

    // Create new property
    createProperty(propertyData) {
      const newProperty = {
        id: MockData.generateId(),
        ...propertyData,
        status: 'active',
        created_at: new Date().toISOString()
      }
      MockData.properties.push(newProperty)
      return newProperty
    },

    // Create new unit
    createUnit(unitData) {
      const newUnit = {
        id: MockData.generateId(),
        ...unitData,
        status: 'available',
        created_at: new Date().toISOString()
      }
      MockData.units.push(newUnit)
      return newUnit
    },

    // Create application
    createApplication(applicationData) {
      const newApp = {
        id: MockData.generateId(),
        ...applicationData,
        status: 'pending',
        applied_at: new Date().toISOString(),
        reviewed_at: null,
        notes: ''
      }
      MockData.applications.push(newApp)
      return newApp
    },

    // Create maintenance request
    createMaintenance(maintenanceData) {
      const newMaintenance = {
        id: MockData.generateId(),
        ...maintenanceData,
        status: 'open',
        created_at: new Date().toISOString()
      }
      MockData.maintenance.push(newMaintenance)
      return newMaintenance
    },

    // Get agent landlords
    getAgentLandlords() {
      return MockData.agentLandlords
    },

    // Get commissions
    getCommissions(agentId) {
      return MockData.commissions.filter(c => c.agent_id === agentId)
    },

    // Get conversations for a user
    getConversations(userId) {
      return MockData.conversations
        .filter(c => c.participants.includes(userId))
        .sort((a, b) => new Date(b.last_message_at) - new Date(a.last_message_at))
    },

    // Get messages for a conversation
    getMessages(conversationId) {
      return MockData.messages
        .filter(m => m.conversation_id === conversationId)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    },

    // Get conversation by ID
    getConversationById(conversationId) {
      return MockData.conversations.find(c => c.id === conversationId)
    },

    // Get the other participant in a conversation
    getOtherParticipant(conversation, userId) {
      const otherId = conversation.participants.find(p => p !== userId)
      return MockData.users.find(u => u.id === otherId)
    },

    // Send a message
    sendMessage(conversationId, senderId, content) {
      const newMessage = {
        id: MockData.generateId(),
        conversation_id: conversationId,
        sender_id: senderId,
        content: content,
        created_at: new Date().toISOString()
      }
      MockData.messages.push(newMessage)
      
      // Update conversation last message
      const conv = MockData.conversations.find(c => c.id === conversationId)
      if (conv) {
        conv.last_message = content
        conv.last_message_at = newMessage.created_at
        // Increment unread for other participant
        conv.participants.forEach(p => {
          if (p !== senderId) {
            conv.unread_count[p] = (conv.unread_count[p] || 0) + 1
          }
        })
      }
      
      return newMessage
    },

    // Start a new conversation
    createConversation(participants, propertyId = null) {
      // Check if conversation already exists
      const existing = MockData.conversations.find(c => 
        c.participants.length === participants.length &&
        participants.every(p => c.participants.includes(p))
      )
      if (existing) return existing

      const newConv = {
        id: MockData.generateId(),
        participants: participants,
        property_id: propertyId,
        last_message: '',
        last_message_at: new Date().toISOString(),
        unread_count: { [participants[0]]: 0, [participants[1]]: 0 }
      }
      MockData.conversations.push(newConv)
      return newConv
    },

    // Mark conversation as read
    markConversationAsRead(conversationId, userId) {
      const conv = MockData.conversations.find(c => c.id === conversationId)
      if (conv) {
        conv.unread_count[userId] = 0
      }
    },

    // Get unread message count
    getUnreadMessageCount(userId) {
      return MockData.conversations
        .filter(c => c.participants.includes(userId))
        .reduce((sum, c) => sum + (c.unread_count[userId] || 0), 0)
    },

    // Saved Properties
    getSavedProperties(userId) {
      return MockData.savedProperties
        .filter(s => s.user_id === userId)
        .map(s => ({
          ...s,
          property: MockData.properties.find(p => p.id === s.property_id)
        }))
        .sort((a, b) => new Date(b.saved_at) - new Date(a.saved_at));
    },

    saveProperty(userId, propertyId) {
      const existing = MockData.savedProperties.find(s => s.user_id === userId && s.property_id === propertyId);
      if (existing) return existing;
      
      const newSaved = {
        id: MockData.generateId(),
        user_id: userId,
        property_id: propertyId,
        saved_at: new Date().toISOString()
      };
      MockData.savedProperties.push(newSaved);
      return newSaved;
    },

    unsaveProperty(userId, propertyId) {
      const index = MockData.savedProperties.findIndex(s => s.user_id === userId && s.property_id === propertyId);
      if (index > -1) {
        MockData.savedProperties.splice(index, 1);
        return true;
      }
      return false;
    },

    isPropertySaved(userId, propertyId) {
      return MockData.savedProperties.some(s => s.user_id === userId && s.property_id === propertyId);
    },

    // Viewings
    getViewings(userId, role = 'tenant') {
      let viewings = [...MockData.viewings];
      if (role === 'tenant') {
        viewings = viewings.filter(v => v.user_id === userId);
      } else if (role === 'landlord') {
        viewings = viewings.filter(v => v.landlord_id === userId);
      }
      return viewings.map(v => ({
        ...v,
        property: MockData.properties.find(p => p.id === v.property_id),
        unit: MockData.units.find(u => u.id === v.unit_id),
        user: MockData.users.find(u => u.id === v.user_id)
      })).sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));
    },

    scheduleViewing(viewingData) {
      const newViewing = {
        id: MockData.generateId(),
        ...viewingData,
        status: 'scheduled',
        created_at: new Date().toISOString()
      };
      MockData.viewings.push(newViewing);
      return newViewing;
    },

    cancelViewing(viewingId) {
      const viewing = MockData.viewings.find(v => v.id === viewingId);
      if (viewing) {
        viewing.status = 'cancelled';
        return viewing;
      }
      return null;
    },

    // Leases
    getLeases(userId, role = 'landlord') {
      let leases = [...MockData.leases];
      if (role === 'tenant') {
        leases = leases.filter(l => l.tenant_id === userId);
      } else if (role === 'landlord') {
        leases = leases.filter(l => l.landlord_id === userId);
      }
      return leases.map(l => ({
        ...l,
        property: MockData.properties.find(p => p.id === l.property_id),
        unit: MockData.units.find(u => u.id === l.unit_id),
        tenant: MockData.users.find(u => u.id === l.tenant_id),
        landlord: MockData.users.find(u => u.id === l.landlord_id)
      }));
    },

    createLease(leaseData) {
      const newLease = {
        id: MockData.generateId(),
        ...leaseData,
        status: 'active',
        created_at: new Date().toISOString()
      };
      MockData.leases.push(newLease);
      
      // Update unit status
      const unit = MockData.units.find(u => u.id === leaseData.unit_id);
      if (unit) {
        unit.status = 'occupied';
      }
      
      return newLease;
    },

    terminateLease(leaseId) {
      const lease = MockData.leases.find(l => l.id === leaseId);
      if (lease) {
        lease.status = 'terminated';
        
        // Update unit status
        const unit = MockData.units.find(u => u.id === lease.unit_id);
        if (unit) {
          unit.status = 'available';
        }
        return lease;
      }
      return null;
    },

    // Invitation methods
    getInvitations(filters = {}) {
      let invitations = [...MockData.invitations];
      if (filters.invited_by) invitations = invitations.filter(i => i.invited_by === filters.invited_by);
      if (filters.role) invitations = invitations.filter(i => i.role === filters.role);
      if (filters.status) invitations = invitations.filter(i => i.status === filters.status);
      return invitations;
    },

    createInvitation(invitationData) {
      const newInvitation = {
        id: MockData.generateId(),
        ...invitationData,
        status: 'pending',
        token: 'tok_' + Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      MockData.invitations.push(newInvitation);
      return newInvitation;
    },

    acceptInvitation(token) {
      const invitation = MockData.invitations.find(i => i.token === token && i.status === 'pending');
      if (invitation) {
        invitation.status = 'accepted';
        invitation.accepted_at = new Date().toISOString();
        return invitation;
      }
      return null;
    },

    // Qualification questions methods
    getQualificationQuestions(landlordId) {
      return MockData.qualificationQuestions.filter(q => q.landlord_id === landlordId);
    },

    createQualificationQuestion(questionData) {
      const newQuestion = {
        id: MockData.generateId(),
        ...questionData,
        created_at: new Date().toISOString()
      };
      MockData.qualificationQuestions.push(newQuestion);
      return newQuestion;
    },

    updateQualificationQuestion(id, updates) {
      const question = MockData.qualificationQuestions.find(q => q.id === id);
      if (question) {
        Object.assign(question, updates);
        return question;
      }
      return null;
    },

    deleteQualificationQuestion(id) {
      const index = MockData.qualificationQuestions.findIndex(q => q.id === id);
      if (index > -1) {
        MockData.qualificationQuestions.splice(index, 1);
        return true;
      }
      return false;
    },

    // Question answers methods
    getQuestionAnswers(applicationId) {
      return MockData.questionAnswers.filter(qa => qa.application_id === applicationId);
    },

    submitQuestionAnswers(applicationId, answers) {
      const questions = MockData.qualificationQuestions;
      const newAnswers = answers.map(a => {
        const question = questions.find(q => q.id === a.question_id);
        let score = 0;
        if (question) {
          score = a.answer === question.preferred_answer ? question.weight : 0;
        }
        return {
          id: MockData.generateId(),
          application_id: applicationId,
          question_id: a.question_id,
          answer: a.answer,
          score: score
        };
      });
      MockData.questionAnswers.push(...newAnswers);
      return newAnswers;
    },

    getApplicationScore(applicationId) {
      const answers = MockData.questionAnswers.filter(qa => qa.application_id === applicationId);
      const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
      const maxScore = answers.reduce((sum, a) => {
        const question = MockData.qualificationQuestions.find(q => q.id === a.question_id);
        return sum + (question ? question.weight : 0);
      }, 0);
      return {
        score: totalScore,
        maxScore: maxScore,
        percentage: maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
      };
    },

    // Leads methods
    getLeads(agentId) {
      return MockData.leads.filter(l => l.agent_id === agentId);
    },

    createLead(leadData) {
      const newLead = {
        id: MockData.generateId(),
        ...leadData,
        status: 'new',
        created_at: new Date().toISOString()
      };
      MockData.leads.push(newLead);
      return newLead;
    },

    updateLead(id, updates) {
      const lead = MockData.leads.find(l => l.id === id);
      if (lead) {
        Object.assign(lead, updates);
        return lead;
      }
      return null;
    },

    // Email logs methods
    getEmailLogs(filters = {}) {
      let logs = [...MockData.emailLogs];
      if (filters.sender_id) logs = logs.filter(l => l.sender_id === filters.sender_id);
      if (filters.type) logs = logs.filter(l => l.type === filters.type);
      if (filters.status) logs = logs.filter(l => l.status === filters.status);
      return logs;
    },

    createEmailLog(logData) {
      const newLog = {
        id: MockData.generateId(),
        ...logData,
        sent_at: new Date().toISOString()
      };
      MockData.emailLogs.push(newLog);
      return newLog;
    }
  }
}

// Export to global
window.MockData = MockData
