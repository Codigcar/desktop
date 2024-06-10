import React, { Component } from "react";

import ModalErrorComponent from "../ModalErrorComponent/ModalErrorComponent";
import strings from "../../assets/strings";
import { ErrorStateService } from "../../services/errorState";

export default class ModalHandleError extends Component {
  constructor(props) {
    super(props);

    this.handleMessages = this.handleMessages
    this.hasMessage = this.hasMessage
    this.hasError = this.hasError
    this.messageOk = this.messageOk
    this.getModals = this.getModals

    this.state = {
      messages: [],
      visible: ErrorStateService.getIsLogout() ? false : true
    };
  }

  hasMessage(err) {
    return (
      err &&
      err.response &&
      err.response.data &&
      err.response.data.meta &&
      err.response.data.meta.mensajes &&
      err.response.data.meta.mensajes.length > 0
    );
  }

  handleMessages(err) {
    if (this.hasMessage(err)) {
      this.setState({ messages: err.response.data.meta.mensajes });
    } else {
      this.setState({
        messages: [
          {
            mensaje:
              strings.messages.error
          }
        ]
      });
    }
  }

  hasError(err) {
    return err && err.status != 200 && err.status != 201;
  }

  messageOk() {
    const { messages, redirect, redirectRoute } = this.state;

    let _messages = this.state.messages;
    _messages.pop();
    this.setState({ messages: _messages });

    if (messages.length == 0 && redirect) {
      if (redirectRoute) {
        this.props.navigation.navigate(redirectRoute);
      } else {
        this.props.navigation.navigate("MainMenu");
      }
    }
  }

  getModals() {
    let messageViews = this.state.messages.map((message, i) => {
      return (
        <ModalErrorComponent
          key={i}
          TextError={message.mensaje}
          Visibility={
            this.state.messages.length > 0 &&
            i == this.state.messages.length - 1 &&
            this.state.visible
          }
          Callback={this.messageOk.bind(this)}
        />
      );
    });

    return messageViews;
  }
}
