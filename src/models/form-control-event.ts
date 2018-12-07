import * as React from "react";

export interface IFormControlEvent extends React.FormEvent {
    currentTarget: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
}