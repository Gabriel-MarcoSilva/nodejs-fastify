-- Cria a tabela users se n existir
CREATE TABLE IF NOT EXISTS Users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Bookings (
    id VARCHAR(36) PRIMARY KEY,
    room_id VARCHAR(255),
    guest_name VARCHAR(255),
    check_in_date DATE,
    check_out_date DATE,
    user_id VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- TABELAS QUE ARMAZENAM AS ENTIDADES CRIADAS