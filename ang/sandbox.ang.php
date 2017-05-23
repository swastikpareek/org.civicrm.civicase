<?php
// This file declares an Angular module which can be autoloaded
// in CiviCRM. See also:
// http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_angularModules

return array(
  'js' => array(
    0 => 'ang/sandbox.js',
    1 => 'ang/sandbox/*.js',
    2 => 'ang/sandbox/*/*.js',
  ),
  'css' => array(
    0 => 'ang/sandbox.css',
  ),
  'partials' => array(
    0 => 'ang/sandbox',
  ),
  'settings' => array(),
  'requires' => array('crmRouteBinder', 'crmUi', 'crmUtil', 'ngRoute', 'crmResource'),
);
