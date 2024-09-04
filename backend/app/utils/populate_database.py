import logging
from datetime import datetime

from faker import Faker
from sqlmodel import Session, SQLModel, create_engine

from app.core.config import settings
from app.core.security import get_password_hash
from app.models import (
    Address,
    Insurance,
    Phone,
    Professional,
    ProfessionalInsurance,
    SocialMedia,
    Specialization,
    User,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuração do banco de dados
# DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

# Criar tabelas no banco de dados
SQLModel.metadata.create_all(engine)

# Inicializar Faker com locale pt_BR
fake = Faker("pt_BR")
cidades = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Porto Alegre",
    "Curitiba",
    "Salvador",
    "Brasília",
    "Fortaleza",
    "Recife",
    "Manaus",
]


def create_fake_professional():
    user = User(
        name=fake.name(),
        email=fake.email(),
        password=fake.password(),
        hashed_password=get_password_hash(fake.password()),
        is_active=True,
        is_superuser=False,
    )

    professional_data = Professional(
        self_description=fake.text(),
        home_service=fake.boolean(),
        accepts_insurance=fake.boolean(),
        private_only=fake.boolean(),
        remote_appointment=fake.boolean(),
        in_person_appointment=fake.boolean(),
    )

    address = Address(
        street=fake.street_name(),
        number=fake.building_number(),
        complement=fake.address(),
        neighborhood=fake.bairro(),
        city=fake.random_element(elements=cidades),
        state=fake.estado_sigla(),
        postal_code=fake.postcode(),
    )

    phone = Phone(
        phone_number=fake.phone_number(),
        phone_type=fake.random_element(elements=("fixed", "mobile")),
        has_whatsapp=fake.boolean(),
        has_telegram=fake.boolean(),
        is_primary=fake.boolean(),
        usage_type=fake.random_element(elements=("personal", "professional")),
    )

    social_media_contact = SocialMedia(
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
        is_primary=fake.boolean(),
        usage_type=fake.random_element(elements=("personal", "professional")),
    )

    specialization = Specialization(
        specialization=fake.job(),
        description=fake.text(),
        certification=fake.word(),
        institution=fake.company(),
        year_obtained=datetime.strptime(fake.year(), "%Y"),
    )

    insurance = Insurance(
        name=fake.company(),
    )

    return (
        user,
        professional_data,
        address,
        phone,
        social_media_contact,
        specialization,
        insurance,
    )


def populate_database():
    with Session(engine) as session:
        for _ in range(30):
            (
                user,
                professional,
                address,
                phone,
                social_media,
                specialization,
                insurance,
            ) = create_fake_professional()

            session.add(user)
            session.commit()

            professional.user_id = user.id
            session.add(professional)
            session.commit()

            address.user_id = user.id
            session.add(address)
            session.commit()

            phone.user_id = user.id
            session.add(phone)
            session.commit()

            social_media.user_id = user.id
            session.add(social_media)
            session.commit()

            specialization.professional_id = professional.id
            session.add(specialization)
            session.commit()

            session.add(insurance)
            session.commit()

            professional_insurance = ProfessionalInsurance(
                professional_id=professional.id, insurance_id=insurance.id
            )
            session.add(professional_insurance)
            session.commit()

        session.commit()


if __name__ == "__main__":
    logger.info("Creating fake datas")
    populate_database()
    logger.info("Initial fake datas created")
