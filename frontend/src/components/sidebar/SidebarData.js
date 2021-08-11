  
import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';




export const SidebarData = [
  {
    title: 'Menú',
    path: '/menu',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Usuarios',
    path: '/usuarios',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-text'
  },
  {
    title: 'Bienes',
    path: '/bienes',
    icon: <AiIcons.AiOutlineBook />,
    cName: 'nav-text'
  },
  {
    title: 'Proveedores',
    path: '/proveedores',
    icon: <IoIcons.IoMdBriefcase />,
    cName: 'nav-text'
  },
  {
    title: 'CONAC',
    path: '/conac',
    icon: <IoIcons.IoMdPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Modelos',
    path: '/modelos',
    icon: <IoIcons.IoIosBookmark />,
    cName: 'nav-text'
  },
  {
    title: 'Proyectos',
    path: '/proyectos',
    icon: <IoIcons.IoMdClipboard />,
    cName: 'nav-text'
  },
  {
    title: 'Trimestres',
    path: '/trimestres',
    icon: <AiIcons.AiFillCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Catalogo Depreciación',
    path: '/depreciacion',
    icon: <AiIcons.AiFillCalculator />,
    cName: 'nav-text'
  },
  {
    title: 'Areas',
    path: '/areas',
    icon: <IoIcons.IoLogoModelS />,
    cName: 'nav-text'
  },
  {
    title: 'Departamentos',
    path: '/departamentos',
    icon: <IoIcons.IoMdBusiness />,
    cName: 'nav-text'
  }
];