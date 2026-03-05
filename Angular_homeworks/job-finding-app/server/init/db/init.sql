--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2026-03-05 04:17:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 55750)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 55769)
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    logo character varying NOT NULL,
    address character varying NOT NULL,
    industry character varying NOT NULL,
    website character varying NOT NULL,
    followers integer NOT NULL,
    employees integer NOT NULL,
    description text[] NOT NULL
);


ALTER TABLE public.company OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 55761)
-- Name: education; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.education (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role character varying NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    company character varying NOT NULL,
    user_id uuid
);


ALTER TABLE public.education OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 55777)
-- Name: job; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    expires character varying NOT NULL,
    "position" character varying NOT NULL,
    "startingSalary" integer NOT NULL,
    "workType" character varying NOT NULL,
    location character varying NOT NULL,
    country character varying NOT NULL,
    qualifications text[] NOT NULL,
    description character varying NOT NULL,
    "techStack" text[] NOT NULL,
    "prefferedSkills" text[] NOT NULL,
    "isApplied" boolean DEFAULT false NOT NULL,
    "createdAt" character varying NOT NULL,
    user_id uuid,
    company_id uuid
);


ALTER TABLE public.job OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 55786)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying NOT NULL,
    connections integer DEFAULT 0 NOT NULL,
    city character varying NOT NULL,
    country character varying NOT NULL,
    work_status character varying NOT NULL,
    "refreshTokens" text[] DEFAULT '{}'::text[]
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 4928 (class 0 OID 55769)
-- Dependencies: 219
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company (id, name, logo, address, industry, website, followers, employees, description) FROM stdin;
\.


--
-- TOC entry 4927 (class 0 OID 55761)
-- Dependencies: 218
-- Data for Name: education; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.education (id, role, start_time, end_time, company, user_id) FROM stdin;
\.


--
-- TOC entry 4929 (class 0 OID 55777)
-- Dependencies: 220
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job (id, expires, "position", "startingSalary", "workType", location, country, qualifications, description, "techStack", "prefferedSkills", "isApplied", "createdAt", user_id, company_id) FROM stdin;
\.


--
-- TOC entry 4930 (class 0 OID 55786)
-- Dependencies: 221
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, first_name, last_name, email, password, role, connections, city, country, work_status, "refreshTokens") FROM stdin;
\.


--
-- TOC entry 4774 (class 2606 OID 55776)
-- Name: company PK_056f7854a7afdba7cbd6d45fc20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY (id);


--
-- TOC entry 4776 (class 2606 OID 55785)
-- Name: job PK_98ab1c14ff8d1cf80d18703b92f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY (id);


--
-- TOC entry 4772 (class 2606 OID 55768)
-- Name: education PK_bf3d38701b3030a8ad634d43bd6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 55795)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 4780 (class 2606 OID 55801)
-- Name: job FK_13dd4ad96c9a725eadf48db7558; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT "FK_13dd4ad96c9a725eadf48db7558" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 4781 (class 2606 OID 55806)
-- Name: job FK_51cb12c924d3e8c7465cc8edff2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT "FK_51cb12c924d3e8c7465cc8edff2" FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- TOC entry 4779 (class 2606 OID 55796)
-- Name: education FK_5bfcef10ecdda36d2ee68aa2049; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT "FK_5bfcef10ecdda36d2ee68aa2049" FOREIGN KEY (user_id) REFERENCES public."user"(id);


-- Completed on 2026-03-05 04:17:54

--
-- PostgreSQL database dump complete
--

