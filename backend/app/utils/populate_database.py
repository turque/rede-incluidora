import argparse

from faker import Faker
from sqlmodel import Session, SQLModel, create_engine, select

from app.core.config import settings
from app.models import (
    Address,
    Insurance,
    Phone,
    Professional,
    ProfessionalInsurance,
    ProfessionalSpecialization,
    SocialMedia,
    Specialization,
)

# Configuração do banco de dados
engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

# Criar tabelas no banco de dados
SQLModel.metadata.create_all(engine)

# Inicializar Faker com locale pt_BR
fake = Faker("pt_BR")

# Listas fornecidas para especialidades e planos de saúde
specializations_list = [
    "Psiquiatria Infantil",
    "Neuropsiquiatria",
    "Psicologia Clínica",
    "Neuropsicologia",
    "Psicopedagogia",
    "Terapia Ocupacional",
    "Fonoaudiologia",
    "Psicoterapia Cognitivo-Comportamental",
    "Psicoterapia Familiar",
    "Psicoterapia de Grupo",
    "Psicoterapia Psicodinâmica",
    "Psicoterapia Humanista",
    "Psicoterapia Integrativa",
    "Psicoterapia Sistêmica",
    "Psicoterapia Comportamental",
    "Psicoterapia Analítica",
    "Psicoterapia Gestalt",
    "Psicoterapia Existencial",
    "Psicoterapia Transpessoal",
    "Psicoterapia Interpessoal",
]
insurances_list = ["Amil", "Bradesco Saúde", "SulAmérica", "Unimed", "Porto Seguro"]
cities_list = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Brasília",
    "Salvador",
    "Fortaleza",
    "Curitiba",
    "Manaus",
    "Recife",
    "Porto Alegre",
    "Belém",
    "Goiânia",
    "Guarulhos",
    "Campinas",
    "São Luís",
    "São Gonçalo",
    "Maceió",
    "Duque de Caxias",
    "Natal",
    "Teresina",
]


def load_insurances_and_specializations():
    with Session(engine) as session:
        for name in specializations_list:
            specialization = session.exec(
                select(Specialization).where(Specialization.name == name)
            ).first()
            if not specialization:
                specialization = Specialization(name=name)
                session.add(specialization)

        for name in insurances_list:
            insurance = session.exec(
                select(Insurance).where(Insurance.name == name)
            ).first()
            if not insurance:
                insurance = Insurance(name=name)
                session.add(insurance)

        session.commit()


def create_fake_data():
    professional = Professional(
        name=fake.name(),
        treatment=fake.random_element(
            elements=("Dr.", "Dra.", "Psicólogo", "Psicóloga")
        ),
        self_description=fake.text(max_nb_chars=200),
        home_care=fake.boolean(),
        accepts_insurance=fake.boolean(),
        remote_appointment=fake.boolean(),
        in_person_appointment=fake.boolean(),
    )

    addresses = [
        Address(
            street=fake.street_name(),
            number=fake.building_number(),
            complement=fake.address(),
            neighborhood=fake.bairro(),
            city=fake.random_element(elements=cities_list),
            state=fake.estado_sigla(),
            postal_code=fake.postcode(),
            professional=professional,
        )
        for _ in range(fake.random_int(min=1, max=3))
    ]

    phones = [
        Phone(
            phone_number=fake.phone_number(),
            phone_type=fake.random_element(elements=("fixed", "mobile")),
            has_whatsapp=fake.boolean(),
            has_telegram=fake.boolean(),
            is_primary=fake.boolean(),
            usage_type=fake.random_element(elements=("personal", "professional")),
            professional=professional,
        )
        for _ in range(fake.random_int(min=1, max=3))
    ]

    social_medias = [
        SocialMedia(
            platform=fake.random_element(
                elements=(
                    "Instagram",
                    "Facebook",
                    "TikTok",
                    "LinkedIn",
                    "Twitter",
                    "YouTube",
                    "Snapchat",
                    "Pinterest",
                )
            ),
            username=fake.user_name(),
            profile_url=fake.url(),
            professional=professional,
        )
        for _ in range(fake.random_int(min=1, max=3))
    ]

    with Session(engine) as session:
        specializations = session.exec(select(Specialization)).all()
        insurances = session.exec(select(Insurance)).all()

    specialization_ids = [
        fake.random_element(elements=specializations).id
        for _ in range(fake.random_int(min=1, max=5))
    ]
    specialization_ids = list(set(specialization_ids))

    insurance_ids = [
        fake.random_element(elements=insurances).id
        for _ in range(fake.random_int(min=1, max=5))
    ]
    insurance_ids = list(set(insurance_ids))

    return (
        professional,
        addresses,
        phones,
        social_medias,
        specialization_ids,
        insurance_ids,
    )


def populate_database(num_records: int):
    load_insurances_and_specializations()

    with Session(engine) as session:
        for _ in range(num_records):
            (
                professional,
                addresses,
                phones,
                social_medias,
                specialization_ids,
                insurance_ids,
            ) = create_fake_data()

            session.add(professional)
            session.commit()

            for address in addresses:
                address.professional_id = professional.id
                session.add(address)
            session.commit()

            for phone in phones:
                phone.professional_id = professional.id
                session.add(phone)
            session.commit()

            for social_media in social_medias:
                social_media.professional_id = professional.id
                session.add(social_media)
            session.commit()

            for specialization in specialization_ids:
                professional_specialization = ProfessionalSpecialization(
                    professional_id=professional.id, specialization_id=specialization
                )
                session.add(professional_specialization)
            session.commit()

            for insurance in insurance_ids:
                professional_insurance = ProfessionalInsurance(
                    professional_id=professional.id, insurance_id=insurance
                )
                session.add(professional_insurance)
            session.commit()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Populate the database with fake data."
    )
    parser.add_argument(
        "--num-records", type=int, default=10, help="Number of records to create"
    )
    args = parser.parse_args()

    print("Creating fake data")
    populate_database(args.num_records)
    print("Fake data created")
