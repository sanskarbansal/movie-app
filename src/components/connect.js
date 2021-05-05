// import React, { useEffect, useState } from "react";
import React, { Component } from "react";
import { StoreContext } from "../index";

export const connect = (callback) => {
    return (Comp) => {
        class Wrapper extends Component {
            constructor(props) {
                super(props);
                this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {
                return <Comp {...this.props} {...callback(this.props.store.getState())} dispatch={this.props.store.dispatch} />;
            }
        }
        return class ConnectedWrapper extends Component {
            render() {
                return (
                    <StoreContext.Consumer>
                        {(store) => {
                            return <Wrapper {...this.props} store={store} />;
                        }}
                    </StoreContext.Consumer>
                );
            }
        };
    };
};
// export const connect = (callback) => {
//     return (Comp) => {
//         const Wrapper = (props) => {
//             const [, forceUpdate] = useState(true);
//             useEffect(() => {
//                 return props.store.subscribe(() => {
//                     forceUpdate();
//                 });
//             });
//             console.log(props.store.getState());
//             return <Comp {...props} {...callback(props.store.getState())} dispatch={props.store.dispatch} />;
//         };
//         return (props) => {
//             return (
//                 <StoreContext.Consumer>
//                     {(store) => {
//                         return <Wrapper {...props} store={store} />;
//                     }}
//                 </StoreContext.Consumer>
//             );
//         };
//     };
// };
