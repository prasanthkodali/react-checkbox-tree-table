import React from "react";
import CheckboxTree from "react-checkbox-tree";
import TreeTableNode from "./TreeTableNode";
import "./index.scss";

class CheckboxTreeTable extends CheckboxTree {
  renderTreeNodes(nodes, parent = {}) {
    const {
      expandDisabled,
      expandOnClick,
      icons,
      lang,
      noCascade,
      onClick,
      onlyLeafCheckboxes,
      optimisticToggle,
      showNodeTitle,
      showNodeIcon,
    } = this.props;
    const { id, model } = this.state;
    const { icons: defaultIcons } = CheckboxTree.defaultProps;

    const treeNodes = nodes.map((node) => {
      const key = node.value;
      const flatNode = model.getNode(node.value);
      const children = flatNode.isParent
        ? this.renderTreeNodes(node.children, node)
        : null;

      // Determine the check state after all children check states have been determined
      // This is done during rendering as to avoid an additional loop during the
      // deserialization of the `checked` property
      flatNode.checkState = this.determineShallowCheckState(node, noCascade);

      // Show checkbox only if this is a leaf node or showCheckbox is true
      const showCheckbox = onlyLeafCheckboxes
        ? flatNode.isLeaf
        : flatNode.showCheckbox;

      // Render only if parent is expanded or if there is no root parent
      const parentExpanded = parent.value
        ? model.getNode(parent.value).expanded
        : true;

      if (!parentExpanded) {
        return null;
      }

      return (
        <TreeTableNode
          key={key}
          checked={flatNode.checkState}
          className={node.className}
          disabled={flatNode.disabled}
          expandDisabled={expandDisabled}
          expandOnClick={expandOnClick}
          expanded={flatNode.expanded}
          icon={node.icon}
          icons={{ ...defaultIcons, ...icons }}
          label={node.label}
          lang={lang}
          optimisticToggle={optimisticToggle}
          isLeaf={flatNode.isLeaf}
          isParent={flatNode.isParent}
          showCheckbox={showCheckbox}
          showNodeIcon={showNodeIcon}
          title={showNodeTitle ? node.title || node.label : node.title}
          treeId={id}
          value={node.value}
          onCheck={this.onCheck}
          onClick={onClick && this.onNodeClick}
          onExpand={this.onExpand}
        >
          {children}
        </TreeTableNode>
      );
    });

    return <table>{treeNodes}</table>;
  }
}

export default CheckboxTreeTable;
