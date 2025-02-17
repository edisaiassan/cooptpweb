import { NavLink, useNavigate } from "react-router"

export const NavBar = () => {

    const navigate = useNavigate()

    const navLinks = [
        {
            id: 1,
            title: 'Inicio',
            link: '/',
        },
        {
            id: 2,
            title: 'Productos',
            link: '/product',
        },
        {
            id: 3,
            title: 'Nosotros',
            link: '/us',
        },
        {
            id: 4,
            title: 'Contactanos',
            link: '/contactUs',
        },
        {
            id: 5,
            title: 'Ubícanos',
            link: '/findUs',
        }
    ]

    const socialNetworks = [
        {
            id: 1,
            title: 'Instagram',
            link: 'https://www.figma.com/design/DqViA3tmJkEhhrH2B4itqN/Anfibios-y-reptiles?node-id=49848-6343&t=Du9mYETC0KNEleOU-0',
            icon: 'bi bi-instagram'
        },
        {
            id: 2,
            title: 'TikTok',
            link: 'https://www.figma.com/design/DqViA3tmJkEhhrH2B4itqN/Anfibios-y-reptiles?node-id=49848-6343&t=Du9mYETC0KNEleOU-0',
            icon: 'bi bi-tiktok'
        },
    ]
    return (
        <nav className="px-4 py-2 text-white bg-gradient-to-b from-green-600 to-green-700/85">
            <div className="max-w-[1920px] mx-auto gap-2 flex justify-center items-center">
                <div>
                    <h1 className="text-3xl font-bold">TP</h1>
                </div>
                <div className="w-full overflow-x-auto relative custom-scrollbar">
                    <ul className="hidden sm:flex gap-2 justify-center">
                        <GenerateList navLinks={navLinks} />
                    </ul>
                </div>
                <div>
                    <ul className="flex gap-2">
                        {socialNetworks.map(socialNetwork => (
                            <NavLink key={socialNetwork.id}
                                className='hover:text-gray-50 transition-transform hover:scale-110 transform inline-block duration-300'
                                to={socialNetwork.link}>
                                {socialNetwork.title}
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-full overflow-x-auto sm:hidden custom-scrollbar">
                <ul className="flex gap-2">
                    <GenerateList navLinks={navLinks} />
                </ul>
            </div>
            <style>
                {`
                    /* Ocultar Scroll por defecto */
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 0px;
                        height: 0px;
                        display: none;
                    }

                    /* Mostrar Scroll solo al pasar el mouse */
                    .custom-scrollbar:hover::-webkit-scrollbar {
                        width: 6px;
                        height: 6px;
                        display: block;
                    }

                    /* Estilizar el Thumb (barra del scroll) */
                    .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                        background-color: rgba(107, 114, 128, 0.5); /* Gris semi-transparente */
                        border-radius: 4px;
                    }

                    /* Estilizar el Track (fondo del scroll) */
                    .custom-scrollbar:hover::-webkit-scrollbar-track {
                        background-color: transparent;
                    }
                `}
            </style>
        </nav>
    );
};

export const GenerateList = ({ navLinks }) => {
    return (
        navLinks.map(navLink => (
            <NavLink key={navLink.id}
                className='hover:text-gray-50 transition-transform hover:scale-110 transform inline-block duration-300'
                to={navLink.link}>
                {navLink.title}
            </NavLink>
        ))
    );
}