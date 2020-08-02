import React from 'react';
import classNames from 'classnames';
import TreeNode from 'react-checkbox-tree';

class TreeTableNode extends TreeNode {
  renderChildren() {
    if (!this.props.expanded) {
      return null;
    }

    return this.props.children;
  }

  render() {
    const { className, disabled, expanded, isLeaf } = this.props;
    const nodeClass = classNames(
      {
        'rct-node': true,
        'rct-node-leaf': isLeaf,
        'rct-node-parent': !isLeaf,
        'rct-node-expanded': !isLeaf && expanded,
        'rct-node-collapsed': !isLeaf && !expanded,
        'rct-disabled': disabled
      },
      className
    );

    return (
      <>
        <tr className={nodeClass}>
          <td>
            <span className="rct-text">
              {this.renderCollapseButton()}
              {this.renderLabel()}
            </span>
          </td>
        </tr>
        {this.renderChildren()}
      </>
    );
  }
}

export default TreeTableNode;
