// Copyright 2005 The ZZ Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**********************************************************************************************************************
 * File overview section                                                                                              *
 **********************************************************************************************************************/

/**
 * @fileoverview Provide zz.ui.mdl.IconToggleRenderer class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.IconToggleRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom.classlist' );
goog.require( 'zz.ui.mdl.ControlRenderer' );

/**********************************************************************************************************************
 * Renderer definition section                                                                                        *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.mdl.IconToggle}s. Extends the superclass to support icon toggles states.
 * @constructor
 * @extends {zz.ui.mdl.ControlRenderer}
 */
zz.ui.mdl.IconToggleRenderer = function( ){

	zz.ui.mdl.IconToggleRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.mdl.IconToggleRenderer, zz.ui.mdl.ControlRenderer );
goog.addSingletonGetter( zz.ui.mdl.IconToggleRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.mdl.IconToggleRenderer.CSS_CLASS = goog.getCssName( 'mdl-icon-toggle' );

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {zz.ui.mdl.IconToggle} control
 * @param {Element} element
 * @override
 */
zz.ui.mdl.IconToggleRenderer.prototype.decorate = function( control, element ){

	// Ripple dom.
	if( goog.dom.classlist.contains( element, zz.ui.mdl.IconToggle.CSS.RIPPLE_EFFECT ) ){

		goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class':

				zz.ui.mdl.IconToggle.CSS.RIPPLE_CONTAINER + ' ' +
				zz.ui.mdl.IconToggle.CSS.RIPPLE_EFFECT + ' ' +
				zz.ui.mdl.IconToggle.CSS.RIPPLE_CENTER

		}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class':

				zz.ui.mdl.IconToggle.CSS.RIPPLE + ' ' +
				zz.ui.mdl.IconToggle.CSS.IS_ANIMATING
		} ) ) );
	}
	// Input element.
	control.setInputElement( control.getDomHelper( ).getElementsByTagNameAndClass(

		goog.dom.TagName.INPUT,
		zz.ui.mdl.IconToggle.CSS.INPUT,
		element )[ 0 ]
	);
	goog.dom.classlist.add( element, zz.ui.mdl.IconToggle.CSS.IS_UPGRADED );
	return goog.base( this, 'decorate', control, element );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.IconToggleRenderer.prototype.getCssClass = function( ){

	return zz.ui.mdl.IconToggleRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Updates the appearance of the control in response to a state change.
 * @param {zz.ui.mdl.Control} control Control instance to update.
 * @param {goog.ui.Component.State} state State to enable or disable.
 * @param {boolean} enable Whether the control is entering or exiting the state.
 * @override
 */
zz.ui.mdl.IconToggleRenderer.prototype.setState = function( control, state, enable ){

	var element = control.getElement( );
	if( element ){

		if( state === goog.ui.Component.State.FOCUSED ){

			if( !goog.dom.classlist.contains( element, zz.ui.mdl.IconToggle.CSS.RIPPLE_EFFECT ) ){

				this.enableClassName( control, zz.ui.mdl.IconToggle.CSS.IS_FOCUSED, enable );
			}
		}
		this.updateAriaState(element, state, enable);
	}
};

/**
 * Set control input element value.
 * @param {zz.ui.mdl.IconToggle} control
 * @param {*} value
 */
zz.ui.mdl.IconToggleRenderer.prototype.setValue = function( control, value ){

	control.setChecked( value );
	control.getInputElement( ).checked = value;
	this.updateClasses( control );
};

/**
 * Return control input element value.
 * @param {zz.ui.mdl.IconToggle} control
 * @returns {*} value
 */
zz.ui.mdl.IconToggleRenderer.prototype.getValue = function( control ){

	return control.getInputElement( ).checked;
};

/**
 * @param {zz.ui.mdl.IconToggle} control
 */
zz.ui.mdl.IconToggleRenderer.prototype.updateClasses = function( control ){

	//noinspection JSUnresolvedFunction
	if( control.isEnabled( ) ){

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.IconToggle.CSS.IS_DISABLED );

	} else {

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.IconToggle.CSS.IS_DISABLED );
	}
	//noinspection JSUnresolvedFunction
	if( control.isChecked( ) ){

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.IconToggle.CSS.IS_CHECKED );

	}else{

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.IconToggle.CSS.IS_CHECKED );
	}
};

