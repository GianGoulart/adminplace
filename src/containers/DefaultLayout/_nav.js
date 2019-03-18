export default {
    items: [
      {
        name: 'Home',
        url: '/home',
        icon: 'icon-home',
      },
      {
        divider: true,
      },
      {
        title:true,
        name: 'Colaboradores',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: 'text-center'             // optional class names space delimited list for title item ex: "text-center"      
      },
      {
        name: 'Consultar Colaborador',
        url: '/getEmployees',
        icon: 'icon-user',
      },
      {
        name: 'Cadastrar Colaborador',
        url: '/addEmployees',
        icon: 'icon-user-follow',
      },
      {
        divider: true,
      },
      
      { 
        title: true,
        name: 'Bots',
        wrapper: {
          element: '',
          attributes: {},
        },
        class: 'text-center',    
      },
      {
        name: 'Consultar Bot',
        url: '/getBots',
        icon: 'fa fa-cubes',
      },
      {
        name: 'Cadastrar Bot',
        url: '/addBots',
        icon: 'fa fa-cube',
      },
      {
        divider: true,
      },  
      {
        title: true,
        name: 'Mensagens',
        wrapper: {
          element: '',
          attributes: {},
        },
        class: 'text-center' 
      },
      {
        name: 'Consultar Mensagem',
        url: '/getMessages',
        icon: 'fa fa-comments',
      },
      {
        name: 'Enviar Mensagem',
        url: '/sendMessages',
        icon: 'fa fa-plus-square',
      },
      {
        divider: true,
      },  
      {
        title: true,
        name: 'Grupos',
        wrapper: {
          element: '',
          attributes: {},
        },
        class: 'text-center' 
      },
      {
        name: 'Remover membros do grupo',
        url: '/removeMemberGroups',
        icon: 'icon-user-unfollow',
      },
      {
        title: true,
        name: 'Usuários',
        wrapper: {
          element: '',
          attributes: {},
        },
        class: 'text-center' 
      },
      {
        name: 'Consultar Usuários',
        url: '/getUsers',
        icon: 'fa fa-group',
      },
      {
        name: 'Cadastrar Usuários',
        url: '/addUsers',
        icon: 'fa fa-user-plus',
      },
      

    ],
  };
  