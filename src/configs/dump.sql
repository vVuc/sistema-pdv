CREATE DATABASE pdv;

CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha CHAR(60) NOT NULL
);

CREATE TABLE categorias (
    id BIGSERIAL PRIMARY KEY,
    descricao VARCHAR(255)
);

INSERT INTO categorias (descricao) VALUES
    ('Eletrônicos'),
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');

CREATE TABLE produtos (
    id BIGSERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    quantidade_estoque INT,
    valor BIGINT,
    categoria_id BIGINT REFERENCES categorias (id),
    produto_imagem VARCHAR(255)
);

CREATE TABLE clientes (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    cep CHAR(8),
    rua VARCHAR(255),
    numero INT,
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado CHAR(2)
);

CREATE TABLE PEDIDOS (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT references CLIENTES(id),
    observacao VARCHAR(255),
    valor_total BIGINT NOT NULL
);

CREATE TABLE PEDIDO_PRODUTOS(
    id BIGSERIAL PRIMARY KEY,
    pedido_id BIGINT REFERENCES PEDIDOS(id),
    produto_id BIGINT REFERENCES PRODUTOS(id),
    quantidade_produto BIGINT,
    valor_produto BIGINT NOT NULL
);
