import argparse

from faker import Faker
from sqlmodel import Session, SQLModel, create_engine

from app.core.config import settings

# from app.models import User, Professional, Address, Phone, Insurance, Specialization, SocialMedia, ProfessionalInsurance, ProfessionalSpecialization
from app.models import Address, Phone, SocialMedia, User

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


def create_fake_data():
    user = User(
        name=fake.name(),
        email=fake.email(),
        password=fake.password(),
        is_active=True,
        is_superuser=False,
    )

    # professional = Professional(
    #     user=user
    # )

    addresses = [
        Address(
            street=fake.street_name(),
            number=fake.building_number(),
            complement=fake.address(),
            neighborhood=fake.bairro(),
            city=fake.city(),
            state=fake.estado_sigla(),
            postal_code=fake.postcode(),
            user=user,
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
            user=user,
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
            user=user,
        )
        for _ in range(fake.random_int(min=1, max=3))
    ]

    # specializations = [
    #     Specialization(
    #         specialization=fake.random_element(elements=specializations_list)
    #     ) for _ in range(fake.random_int(min=1, max=10))
    # ]

    # insurances = [
    #     Insurance(
    #         name=fake.random_element(elements=insurances_list)
    #     ) for _ in range(fake.random_int(min=1, max=10))
    # ]

    return user, addresses, phones, social_medias
    # return user, professional, addresses, phones, social_medias, specializations, insurances


def populate_database(num_records: int):
    with Session(engine) as session:
        for _ in range(num_records):
            user, addresses, phones, social_medias = create_fake_data()
            # user, professional, addresses, phones, social_medias, specializations, insurances = create_fake_data()

            session.add(user)
            session.commit()

            # session.add(professional)
            # session.commit()

            for address in addresses:
                address.user_id = user.id
                session.add(address)
            session.commit()

            for phone in phones:
                phone.user_id = user.id
                session.add(phone)
            session.commit()

            for social_media in social_medias:
                social_media.user_id = user.id
                session.add(social_media)
            session.commit()

            # for specialization in specializations:
            #     specialization.professional_id = professional.id
            #     session.add(specialization)
            # session.commit()

            # for insurance in insurances:
            #     session.add(insurance)
            #     session.commit()
            #     professional_insurance = ProfessionalInsurance(
            #         professional_id=professional.id, insurance_id=insurance.id
            #     )
            #     session.add(professional_insurance)
            # session.commit()


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
    print("Initial fake data created")
