import React, { Component } from 'react'

export default class Tabs extends Component {
  componentDidMount() {
    var activeTabAnchor = location.href.split('#')[1],
        anchoredContentTab = document.getElementById(activeTabAnchor);

    if (activeTabAnchor && anchoredContentTab) {
      var tabLink = document.querySelector(`[data-tab-id="${activeTabAnchor}"]`);
      tabLink.click();
    } else {
      var firstTabs = document.querySelectorAll('.tabs-link:first-child');

      _.each(firstTabs, function(t) {
        t.click();
      });
    }
  }

  revealTab(e) {
    e.preventDefault();
    var tabId = e.target.dataset.tabId,
        activeTabLinks = document.querySelectorAll('.tabs-link.active'),
        activeTabs = document.querySelectorAll('.tabs-content.active');


    _.each(activeTabLinks, function(a) {
      a.classList.remove('active');
    });

    _.each(activeTabs, function(a) {
      a.classList.remove('active');
    });

    e.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');

    location.href = location.href.split('#')[0] + "#" + e.target.dataset.tabId;
  }

  renderTabLinks() {
    var keys = _.keys(this.props.tabs);

    return _.map(keys, function(k) {
      var link = this.props.tabs[k];

      return (
        <a
          key={`tabs-link-${k}`}
          onClick={this.revealTab}
          href={link.href}
          className="tabs-link"
          data-tab-id={`tabs-content-${k}`}
        >
          {link.text}
        </a>
      );
    }.bind(this));
  }

  renderTabContents() {
    var keys = _.keys(this.props.tabs);

    return _.map(keys, function(k) {
      var tab = this.props.tabs[k];

      return (
        <div
          key={`tabs-content-${k}`}
          className="tabs-content"
          id={`tabs-content-${k}`}
        >
          {tab.content}
        </div>
      );
    }.bind(this));
  }

  render() {
    return (
      <div className="tabs">
        <nav className="tabs-menu">
          {this.renderTabLinks()}
        </nav>

        {this.renderTabContents()}
      </div>
    );
  }
}
