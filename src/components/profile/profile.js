// Componente de perfil de usuario que maneja la informacion del usuario
// Como por ejemplo: Nombre/Username, Foto de perfil, email, etc.

import React from 'react';
import './profile.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                user: {
                    name: '',
                    username: '',
                    email: '',
                    photo: '',
                },
                mostar: false,
                mensaje: '',
        };
    }
    
    componentDidMount() {
        /*this.setState({
        user: this.props.user,
        });*/
        // Que pasaria si el fetch no funciona? o tarda mucho?
        /*fetch('https://jsonplaceholder.typicode.com/users/5')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({
                    user: {
                        name: json.name,
                        username: json.username,
                        email: json.email, 
                        photo: "https://picsum.photos/200/300" //this.props.user.photo // No uso photo del JSON
                    }
                })
            })
            .then(()=>{
                this.setState({mostar: true})
            })*/

        const obtenerUsuario = async () =>{

            try {

                const res = await fetch('https://jsonplaceholder.typicode.com/users/5');
                const data = await res.json();


                this.setState({
                    user: {
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        photo: 'https://picsum.photos/200/300'
                    }
                })

                this.setState({mostar: true})

                
            } catch (error) {

                console.log(`ERROR  ${error}`)

                this.setState({mostar: null})
                this.setState({mensaje: `No se han podido cargar los datos de usuario ${error}`})
                
            }

        }

        obtenerUsuario()
    }
    
    render() {
        return this.state.mostar !== false ? (

            this.state.mensaje === '' ? (
                <div className="profile">
                    <div className="profile-header">
                    <div className="profile-header-photo">
                        <img src={this.state.user.photo} alt="profile" />
                    </div>
                    <div className="profile-header-info">
                        <div className="profile-header-info-name">
                        {this.state.user.name}
                        </div>
                        <div className="profile-header-info-username">
                        @{this.state.user.username}
                        </div>
                    </div>
                    </div>
                    <div className="profile-body">
                    <div className="profile-body-info">
                        <div className="profile-body-info-email">
                        {this.state.user.email}
                        </div>
                    </div>
                    </div>
                </div>
            ) : (

                <div className='profile'>

                    <h3>@{this.state.mensaje}</h3>

                </div>

            )
        ) : (<div>Cargando . . .</div>);
    }
}