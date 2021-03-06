{*
 +--------------------------------------------------------------------+
 | CiviCRM version 5                                                  |
 +--------------------------------------------------------------------+
 | Copyright CiviCRM LLC (c) 2004-2018                                |
 +--------------------------------------------------------------------+
 | This file is a part of CiviCRM.                                    |
 |                                                                    |
 | CiviCRM is free software; you can copy, modify, and distribute it  |
 | under the terms of the GNU Affero General Public License           |
 | Version 3, 19 November 2007 and the CiviCRM Licensing Exception.   |
 |                                                                    |
 | CiviCRM is distributed in the hope that it will be useful, but     |
 | WITHOUT ANY WARRANTY; without even the implied warranty of         |
 | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.               |
 | See the GNU Affero General Public License for more details.        |
 |                                                                    |
 | You should have received a copy of the GNU Affero General Public   |
 | License and the CiviCRM Licensing Exception along                  |
 | with this program; if not, contact CiviCRM LLC                     |
 | at info[AT]civicrm[DOT]org. If you have questions about the        |
 | GNU Affero General Public License or the licensing of CiviCRM,     |
 | see the CiviCRM license FAQ at http://civicrm.org/licensing        |
 +--------------------------------------------------------------------+
*}

<div id="report-tab-set-filters" class="civireport-criteria">
  <div class="crm-accordion-wrapper crm-accordion collapsed">
    <div class="crm-accordion-header">As At Reporting</div><!-- /.crm-accordion-header -->
    <div class="crm-accordion-body">
      <table class="report-layout">
        <tr class="report-contents crm-report crm-report-criteria-filter crm-report-criteria-filter-{$tableName}" {if $field.no_display} style="display: none;"{/if}>
          <td class="label report-contents">{ts}As At Date{/ts}</td>
          <td> {$form.as_at_date.html} <span>Please note that this filter will not exclude activities and/or check the actual logs for data at that date.</span></td>
        </tr>
      </table>
    </div>
  </div>
  <table class="report-layout">
    {assign var="counter" value=1}
    {*{$filters|@var_dump}*}
    {foreach from=$filters item=table key=tableName}
    {assign  var="filterCount" value=$table|@count}
    {* Wrap custom field sets in collapsed accordion pane. *}
    {if $filterGroups.$tableName.group_title and $filterCount gte 1}
    {* we should close table that contains other filter elements before we start building custom group accordion
     *}
    {if $counter eq 1}
  </table>
  {assign var="counter" value=0}
  {/if}
  <div class="crm-accordion-wrapper crm-accordion collapsed">
    <div class="crm-accordion-header">
      {$filterGroups.$tableName.group_title}
    </div><!-- /.crm-accordion-header -->
    <div class="crm-accordion-body">
      <table class="report-layout">
        {/if}
        {if $filterGroups.$tableName.group_extends_contact}
          {assign var=isGroupeddByTableSet value=TRUE}
          {foreach from=$filtersGroupedByTableSets.$tableName item=table key=tableKey}
            <tr class="report-contents crm-report crm-report-criteria-filter crm-report-criteria-filter-{$tableName}">
              <td colspan=2 class=""><h5>{$filterExtendsContactGroup.$tableKey.group_field_label}</h5></td>
            </tr>
            {include file="CRM/Report/Form/Tabs/FilterField.tpl" isGroupedByTableSet='YES'}
          {/foreach}
        {else}
          {include file="CRM/Report/Form/Tabs/FilterField.tpl" isGroupedByTableSet='NO'}
        {/if}
        {if $filterGroups.$tableName.group_title}
      </table>
    </div><!-- /.crm-accordion-body -->
  </div><!-- /.crm-accordion-wrapper -->
  {assign var=closed value="1"} {*-- ie table tags are closed-- *}
  {else}
  {assign var=closed     value="0"} {*-- ie table tags are not closed-- *}
  {/if}
  {/foreach}
  {if $closed eq 0 }
    </table>
  {/if}
</div>
