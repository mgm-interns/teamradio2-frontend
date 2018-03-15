import * as React from 'react';
import { Component } from 'react';
import './Section.scss';
import { CreatingSection } from "./CreatingSection";
import { AddingSongSection } from "./AddingSongSection";
import { SharingSection } from "./SharingSection";

export class Sections extends Component {
  render() {
    return (
      <main>
        <CreatingSection/>
        <AddingSongSection/>
        <SharingSection/>
      </main>
    );
  }
}
