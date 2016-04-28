/**
 * @fileoverview Provide zz.ui.mdl.icontoggle base object.
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.mdl.icontoggle' );

goog.require( 'goog.ui.decorate' );

goog.require( 'zz.ui.mdl.icontoggle.tpl' );
goog.require( 'zz.ui.mdl.IconToggleRenderer' );
goog.require( 'zz.ui.mdl.IconToggle' );
goog.require( 'zz.tests.models.SimplestDataset' );

/**
 * Base namespace for zz.ui.mdl.icontoggle module.
 * @const
 */
zz.ui.mdl.icontoggle = zz.ui.mdl.icontoggle || { };

/**
 * Bootstrap module method.
 */
zz.ui.mdl.icontoggle.bootstrap = function( ){

    var simpleModelDataset = goog.global.simpleModelDataset = new zz.tests.models.SimplestDataset( );
    var simpleModelDatarow = goog.global.simpleModelDatarow = simpleModelDataset.createFirst( );

    goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.IconToggleRenderer.CSS_CLASS, function( ){

        return new zz.ui.mdl.IconToggle( );
    } );

    soy.renderElement( goog.dom.getElement( 'root' ), zz.ui.mdl.icontoggle.tpl.default );

	var tggl1 = goog.ui.decorate( goog.dom.getElement( '1' ) );
	var tggl2 = goog.ui.decorate( goog.dom.getElement( '2' ) );

    tggl1.setModel( simpleModelDataset, simpleModelDatarow, simpleModelDataset.datafield.bool );
	tggl2.setEnabled( false );
};
goog.exportSymbol( 'zz.ui.mdl.icontoggle.bootstrap', zz.ui.mdl.icontoggle.bootstrap );