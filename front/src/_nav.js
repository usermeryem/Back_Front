const navs = [
    {   name:'Gestion_Bibliothèque',
        children:[{
            to: '/livre/add',
            name:'Ajouter un livre'
        },
        {
            to: '/categorie/add',
            name:'Ajouter une Catégorie'            
        },
        {
            to: '/assignLivres',
            name:'Ajouter un livre à une catégorie'   
        }
    
    ]
    },
    {   name:'Livres',
        children:[{
            to: '/categories',
            name: 'Catégories'
        },
        {   to: '/listLivres',
            name:'Liste des livres'
        },]
    },
]
export default navs