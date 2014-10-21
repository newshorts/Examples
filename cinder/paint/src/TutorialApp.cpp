#include "cinder/app/AppBasic.h"
#include "cinder/ImageIO.h"
#include "cinder/gl/Texture.h"
#include "cinder/Perlin.h"
#include "cinder/Channel.h"
#include "cinder/Vector.h"
#include "cinder/Utilities.h"
#include "ParticleController.h"

#define RESOLUTION 100
#define NUM_PARTICLES_TO_SPAWN 75

#include <sstream>
using std::stringstream;

using namespace ci;
using namespace ci::app;

class TutorialApp : public AppBasic {
 public:
	void prepareSettings( Settings *settings );
	void keyDown( KeyEvent event );
	void mouseDown( MouseEvent event );
	void mouseUp( MouseEvent event );
	void mouseMove( MouseEvent event );
	void mouseDrag( MouseEvent event );
	void setup();
	void update();
	void draw();
	
	Perlin mPerlin;

	Channel32f mChannel;
    Channel32f mChannelOverlay;
	gl::Texture	mTexture;
    gl::Texture	mOverlay;
	
	Vec2i mMouseLoc;
	Vec2f mMouseVel;
	bool mIsPressed;
	
	ParticleController mParticleController;
	
	bool mDrawParticles;
	bool mDrawImage;
	bool mSaveFrames;
	bool mCentralGravity;
	bool mAllowPerlin;
	
	int mSaveFrameCount;
    
    bool isFirst;
};

void TutorialApp::prepareSettings( Settings *settings )
{
	settings->setWindowSize( 600, 902 );
	settings->setFrameRate( 60.0f );
}

void TutorialApp::setup()
{	
	mPerlin = Perlin();
	
	Url url( "http://work2.goodbysilverstein.com/patron/images/kiss.jpg" );
	mChannel = Channel32f( loadImage( loadUrl( url ) ) );
    mTexture = gl::Texture( loadImage( loadUrl( url ) ) );
    
    Url overlayUrl( "http://work2.goodbysilverstein.com/patron/images/bottle.png" );
    mChannelOverlay = Channel32f( loadImage( loadUrl( overlayUrl ) ) );
    mOverlay = mChannelOverlay;

	mMouseLoc = Vec2i( 0, 0 );
	mMouseVel = Vec2f::zero();
	
	mDrawParticles	= true;
	mDrawImage		= false;
	mIsPressed		= false;
	mCentralGravity = false;
	mAllowPerlin	= false;
	mSaveFrames		= false;
	mSaveFrameCount = 0;
    
    isFirst = true;
}


void TutorialApp::mouseDown( MouseEvent event )
{
	mIsPressed = true;
}

void TutorialApp::mouseUp( MouseEvent event )
{
	mIsPressed = false;
}

void TutorialApp::mouseMove( MouseEvent event )
{
	mMouseVel = ( event.getPos() - mMouseLoc );
	mMouseLoc = event.getPos();
}

void TutorialApp::mouseDrag( MouseEvent event )
{
	mouseMove( event );
}

void TutorialApp::keyDown( KeyEvent event )
{
	if( event.getChar() == '1' ){
		mDrawImage = ! mDrawImage;
	} else if( event.getChar() == '2' ){
		mDrawParticles = ! mDrawParticles;
	}
	
	if( event.getChar() == 's' ){
		mSaveFrames = ! mSaveFrames;
	} else if( event.getChar() == 'g' ){
		mCentralGravity = ! mCentralGravity;
	} else if( event.getChar() == 'p' ){
		mAllowPerlin = ! mAllowPerlin;
	}
}


void TutorialApp::update()
{
	if( ! mChannel ) return;
	
	if( mIsPressed )
		mParticleController.addParticles( NUM_PARTICLES_TO_SPAWN, mMouseLoc, mMouseVel );
	
//	mParticleController.repulseParticles();
	
	if( mCentralGravity )
		mParticleController.pullToCenter();
		
	if( mAllowPerlin )
		mParticleController.applyPerlin( mPerlin );
		
	mParticleController.update( mChannel, mMouseLoc );
}

void TutorialApp::draw()
{
    if(isFirst) {
        gl::clear( Color( 0, 0, 0 ), true );
        isFirst = false;
    }

    gl::enableAlphaBlending();
	
	if( mDrawImage ){
		mTexture.enableAndBind();
		gl::draw( mTexture, getWindowBounds() );
	}
    
//	if( mDrawParticles ){
		glDisable( GL_TEXTURE_2D );
		mParticleController.draw();
//	}
    
    if( mDrawImage ){
        mOverlay.enableAndBind();
        gl::draw( mOverlay, getWindowBounds() );
    }

//	if( mSaveFrames ){
//		writeImage( getHomeDirectory() / ( "image_" + toString( getElapsedFrames() ) + ".png" ), copyWindowSurface() );
//	}
}

CINDER_APP_BASIC( TutorialApp, RendererGl )
