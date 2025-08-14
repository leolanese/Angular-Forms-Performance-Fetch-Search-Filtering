import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <p>Note: The test should be updated to focus on modern Angular patterns and best practices, rather than legacy enterprise patterns. 
      Modern forms are more powerful, performant, and maintainable than the old approaches</p>

    <table class="ranking-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Solution</th>
          <th>Architecture</th>
          <th>Modern Patterns</th>
          <th>Legacy Patterns</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr class="winner">
          <td>🏆 1st</td>
          <td><strong>Solution 14</strong></td>
          <td>Pure Signal-Based</td>
          <td>✅ Signals, OnPush CD, Modern Control Flow, Functional Injection, Readonly Properties</td>
          <td>❌ None</td>
          <td><strong>100%</strong></td>
        </tr>
        <tr class="silver">
          <td>🥈 2nd</td>
          <td><strong>Solution 13</strong></td>
          <td>Signal-Based Component Composition</td>
          <td>✅ Signals, Computed, Effects, Modern Control Flow, Component Composition</td>
          <td>❌ None</td>
          <td><strong>95%</strong></td>
        </tr>
        <tr class="bronze">
          <td>🥉 3rd</td>
          <td><strong>Solution 12</strong></td>
          <td>Signal + FormBuilder Hybrid</td>
          <td>✅ Signals, Computed, Effects, Modern Control Flow</td>
          <td>❌ FormBuilder, FormGroup</td>
          <td><strong>75%</strong></td>
        </tr>
        <tr class="partial">
          <td>🟡 4th</td>
          <td><strong>Solution 8</strong></td>
          <td>Signal + Template Driven</td>
          <td>✅ Signals, Effects, Modern Control Flow</td>
          <td>❌ Template-driven forms</td>
          <td><strong>70%</strong></td>
        </tr>
        <tr class="partial">
          <td>🟡 5th</td>
          <td><strong>Solution 9</strong></td>
          <td>Signal + Template Driven</td>
          <td>✅ Signals, Modern Control Flow</td>
          <td>❌ Template-driven forms</td>
          <td><strong>65%</strong></td>
        </tr>
        <tr class="legacy">
          <td>❌ 6th</td>
          <td><strong>Solution 3</strong></td>
          <td>Reactive Forms</td>
          <td>✅ takeUntilDestroyed</td>
          <td>❌ FormGroup, FormControl, OnInit, Constructor Injection</td>
          <td><strong>40%</strong></td>
        </tr>
        <tr class="legacy">
          <td>❌ 7th</td>
          <td><strong>Solution 4</strong></td>
          <td>Reactive Forms + Material</td>
          <td>✅ takeUntilDestroyed</td>
          <td>❌ FormGroup, FormControl, OnInit, Constructor Injection</td>
          <td><strong>35%</strong></td>
        </tr>
        <tr class="legacy">
          <td>❌ 8th</td>
          <td><strong>Solution 5</strong></td>
          <td>Reactive Forms</td>
          <td>✅ takeUntilDestroyed</td>
          <td>❌ FormGroup, FormControl, OnInit, Constructor Injection</td>
          <td><strong>30%</strong></td>
        </tr>
        <tr class="legacy">
          <td>❌ 9th</td>
          <td><strong>Solution 6</strong></td>
          <td>Signal + Reactive Forms</td>
          <td>✅ Signals, takeUntilDestroyed</td>
          <td>❌ FormGroup, FormControl, OnInit, Constructor Injection</td>
          <td><strong>45%</strong></td>
        </tr>
        <tr class="legacy">
          <td>❌ 10th</td>
          <td><strong>Solution 7</strong></td>
          <td>Signal + Reactive Forms</td>
          <td>✅ Signals, takeUntilDestroyed</td>
          <td>❌ FormGroup, FormControl, OnInit, Constructor Injection</td>
          <td><strong>50%</strong></td>
        </tr>
        <tr class="legacy">
          <td>❌ 11th</td>
          <td><strong>Solution 10</strong></td>
          <td>Reactive Forms</td>
          <td>✅ takeUntilDestroyed</td>
          <td>❌ FormBuilder, FormGroup, OnInit, Constructor Injection</td>
          <td><strong>25%</strong></td>
        </tr>
        <tr class="legacy">
          <td>❌ 12th</td>
          <td><strong>Solution 11</strong></td>
          <td>Reactive Forms</td>
          <td>✅ takeUntilDestroyed</td>
          <td>❌ FormBuilder, FormGroup, OnInit, Constructor Injection</td>
          <td><strong>20%</strong></td>
        </tr>
        <tr class="legacy">
          <td>❌ 13th</td>
          <td><strong>Solution 1</strong></td>
          <td>Template Driven</td>
          <td>✅ takeUntilDestroyed</td>
          <td>❌ Template-driven forms, OnInit, Constructor Injection</td>
          <td><strong>15%</strong></td>
        </tr>
        <tr class="legacy">
          <td>❌ 14th</td>
          <td><strong>Solution 2</strong></td>
          <td>Template Driven</td>
          <td>✅ takeUntilDestroyed</td>
          <td>❌ Template-driven forms, OnInit, Constructor Injection</td>
          <td><strong>10%</strong></td>
        </tr>
      </tbody>
    </table>

  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
}