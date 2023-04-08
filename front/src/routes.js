import {lazy} from "react"

const Home = lazy(() => import('./components/Home'))
const AddLivre = lazy(()=> import('./components/Pages/Gestion/AddLivre'))
const AddCategorie = lazy(()=> import('./components/Pages/Gestion/AddCategorie'))
const AssignLivres=lazy(()=>import('./components/Pages/Gestion/AssignLivres'))
const ListCategories = lazy(()=> import('./components/Pages/client/ListCategories'))
const ListLivres = lazy(()=> import('./components/Pages/client/ListLivres'))

const routes = [
    {
        path: '/',
        element: Home,
        name:'Home',
        exact: true
    },
    {
        path: '/categorie/add',
        element: AddCategorie,
        name:'Ajouter_Catégorie',
        exact: true
    },
    {
        path: '/categories',
        element: ListCategories,
        name:'Catégories',
        exact: true
    },
    {
        path: '/livre/add',
        element: AddLivre,
        name:'Nouveau_livre',
        exact: true
    },
    {
        path: '/listLivres',
        element: ListLivres,
        name:'Liste des livres',
        exact: true
    },
    {
        path: '/assignLivres',
        element: AssignLivres,
        name: 'livre dans sa catégorie',
        exact: true
    },
]
export default routes