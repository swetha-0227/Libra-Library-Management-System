-- USERS
-- Seed passwords:
-- Muthu / Muthu123
-- Sruthi / Sruthi123
-- Ananya / Ananya123
-- Anand / Anand123
-- Anbu / Anbu123
-- Shree / Shree123
-- Saran / Saran123
-- Vijay / Vijay123
-- Swetha / Swetha123
-- Karthik / Karthik123
-- Riyan / Riyan123
-- Priya / Priya123
-- Arun / Arun123
-- Divya / Divya123
-- Monish / Monish123
-- Nithya / Nithya123
-- Dhanya / Dhanya123
-- Kavya / Kavya123
-- Suresh / Suresh123
INSERT INTO users (username, password, email, role) VALUES
('Muthu', '$2b$10$FpjN6MjiArIPsZ0uaUw.8eB0Pjoau9wGUMG8quVN1/bjl4zcPrBZe', 'muthu@gmail.com', 'ADMIN'),
('Sruthi', '$2b$10$L3xBeXJEnWkjjHD38wkIre.86uuZlEPV629acHxielgx8Ct6qO0z6', 'sruthi@gmail.com', 'ADMIN'),
('Ananya', '$2b$10$sLfgUlJ442nv04cAZOI.p.gIJBQithuz0r7U6PDpHXvTRJPgKPGFK', 'ananya@gmail.com', 'ADMIN'),
('Anand', '$2b$10$dT/QYCJ/vbBBQcIKylVUyePBqv5wMMgeSy/g/goMUV7o/UVEUZkoG', 'anand@gmail.com', 'ADMIN'),
('Anbu', '$2b$10$TvQZX3Iu/SdsLSCaygSFm.5XM6Su/I0CfXlV.1FtGFSag7dK61YUi', 'anbu@gmail.com', 'ADMIN'),

('Shree', '$2b$10$Tw5s11r0eRK8Q0eKJzOJkurGYmgh5x8elyIjq1ow5FuD6l82aS15q', 'shree@gmail.com', 'STUDENT'),
('Saran', '$2b$10$izU/fDdzh9dY/hJVvQzmQecqB5gGJUXGi13TKgyhpjPWzrO4qtyEm', 'saran@gmail.com', 'STUDENT'),
('Vijay', '$2b$10$c2u4BPWy8p7FtQLqFIWEROKJ41Q3NO8JObq0u6GcaX.GriP0VLHkq', 'vijay@gmail.com', 'STUDENT'),
('Swetha', '$2b$10$bn4RvZhsU4HgE77Fx4W0KO6eKvuFra0E0yFgh2zupgiHY.peP14ey', 'swetha@gmail.com', 'STUDENT'),
('Karthik', '$2b$10$RuzQKJ2uGT1ThvCS83C0L.BWhqUCyn9fccvkra84PhgPQrKsxURy2', 'karthik@gmail.com', 'STUDENT'),
('Riyan', '$2b$10$2xZnvWRzBXSaTisuCDlfp.npO0W8DbEa85sERYkApfjWJF1rxkH/6', 'riyan@gmail.com', 'STUDENT'),
('Priya', '$2b$10$33nBwS3LtnUih/3aouOnjOe15KP2VXdiCejW/4i5l.CipmXYO3Y.S', 'priya@gmail.com', 'STUDENT'),
('Arun', '$2b$10$daxcxq8xv6ep0NUpFYVkHOTaXG3ujLtI6aomUWHTFKDI0KR9XdL6G', 'arun@gmail.com', 'STUDENT'),
('Divya', '$2b$10$wONEg2O1vJvgEPhJ3ygJzuxLYKr93GTsulsYVGKXhm5x4r0QbhqJC', 'divya@gmail.com', 'STUDENT'),
('Monish', '$2b$10$KYOGIEgvVfA5hdNsyLN5MOzMmUInbJcJSXMyvRI1fj4fsLWNqLlbS', 'monish@gmail.com', 'STUDENT'),
('Nithya', '$2b$10$/dMhhdM1ODUqA/bGf4UQqu8DraxUWmCBV9vtMIxnAQGJHrTcvKWZu', 'nithya@gmail.com', 'STUDENT'),
('Dhanya', '$2b$10$xZMwZdCvtADuc6eza6o/qOWWCvKRe2Xlgjr58hHt4qTey5RKVNLw2', 'dhanya@gmail.com', 'STUDENT'),
('Kavya', '$2b$10$sQJ8Ovu9HBWjaZOellvfCuxW9eAzF2Rd.Eh/nsihCsHN30AertdEi', 'kavya@gmail.com', 'STUDENT'),
('Suresh', '$2b$10$poi/xj6u.pzkwnFIUVJqkeeQ80CxUtOA.sxI5w8UkLXVZseB6EDVS', 'suresh@gmail.com', 'STUDENT');

-- CATEGORY
INSERT INTO category (name) VALUES
('Fiction'),
('Technology'),
('Science'),
('History');

-- BOOKS
INSERT INTO book (title, author, available, category_id) VALUES
('Java Basics', 'James Gosling', TRUE, 2),
('Spring Boot Guide', 'Pivotal', TRUE, 2),
('Physics Fundamentals', 'Newton', TRUE, 3),
('World History', 'Herodotus', TRUE, 4),
('To Kill a Mockingbird', 'Harper Lee', TRUE, 1),
('1984', 'George Orwell', TRUE, 1),
('The Great Gatsby', 'F. Scott Fitzgerald', TRUE, 1),
('Pride and Prejudice', 'Jane Austen', TRUE, 1),
('React Handbook', 'Flavio Copes', TRUE, 2),
('Node.js Guide', 'Node Foundation', TRUE, 2),
('Quantum Mechanics', 'Richard Feynman', TRUE, 3),
('Ancient Civilizations', 'Various', TRUE, 4);
